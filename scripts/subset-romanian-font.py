"""Generate the small Romanian extension from the existing OFL font.

Build-time only: python -m pip install fonttools brotli
"""
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
source = root / 'node_modules/@fontsource-variable/noto-sans/files/noto-sans-latin-ext-wght-normal.woff2'
target = root / 'app/assets/fonts/noto-sans-ro.woff2'
target.parent.mkdir(parents=True, exist_ok=True)
options = subset.Options()
options.flavor = 'woff2'
font = TTFont(source)
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=[0x102, 0x103, 0x218, 0x219, 0x21A, 0x21B])
subsetter.subset(font)
font.flavor = 'woff2'
font.save(target)
assert 'fvar' in font
assert set([0x102, 0x103, 0x218, 0x219, 0x21A, 0x21B]).issubset(font.getBestCmap())
print(f'Romanian extension: {source.stat().st_size} -> {target.stat().st_size} bytes; variable axes retained')
