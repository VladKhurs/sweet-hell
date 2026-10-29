#!/usr/bin/env python3
"""Package the existing Godot Web export for itch.io without modifying it."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import sys

root = Path(__file__).resolve().parent.parent
web = root / "public" / "game"
html = web / "index.html"
if not html.is_file():
    sys.exit("Error: export Godot Web into public/game/index.html first.")

contents = html.read_text(encoding="utf-8")
# A Godot export may use the executable name `sweet_hell`, `index` or another name.
import re
match = re.search(r'"executable"\s*:\s*"([^"/\\]+)"', contents)
if not match:
    sys.exit("Error: cannot determine the Web export executable from index.html.")
executable = match.group(1)
for extension in ("js", "wasm", "pck"):
    if not (web / f"{executable}.{extension}").is_file():
        sys.exit(f"Error: {executable}.{extension} is missing; export again from Godot.")

if 'GODOT_THREADS_ENABLED = true' in contents:
    sys.exit("Error: Web export uses threads. Re-export with Thread Support disabled for itch.io.")

output = root / "release" / "SweetHell_itchio_web.zip"
output.parent.mkdir(exist_ok=True, parents=True)
with ZipFile(output, "w", ZIP_DEFLATED, compresslevel=6) as archive:
    for file in sorted(web.rglob("*")):
        if file.is_file() and not file.name.startswith("."):
            archive.write(file, file.relative_to(web).as_posix())
print(f"itch.io package: {output} ({output.stat().st_size / 1024**2:.1f} MiB)")
print("Note: this packages the Web build currently in public/game; it does not export the Godot project.")
