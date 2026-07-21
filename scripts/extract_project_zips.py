"""Extract portfolio-relevant files from Project_zip_all/*.zip (no media/node_modules)."""
from __future__ import annotations

import re
import zipfile
from pathlib import Path

ROOT = Path(r"C:\Users\PMLS\Desktop\Portfolio\Project_zip_all")
OUT = ROOT / "_extracted"

NAME_PAT = re.compile(
    r"(^|/)(readme(\.[^/]+)?|requirements[^/]*\.txt|package\.json|pyproject\.toml|"
    r"\.env\.example|env\.example|docker-compose[^/]*|dockerfile|"
    r"manage\.py|app\.py|main\.py|settings\.py)$",
    re.I,
)
EXTRA_MD = re.compile(r"\.(md|txt)$", re.I)
SKIP = re.compile(
    r"(node_modules|\.git/|__pycache__|\.venv|venv/|dist/|\.next/|staticfiles/|"
    r"media/|uploads/|\.mp4|\.wav|\.webm|\.mp3|package-lock|yarn\.lock|\.pyc|"
    r"chroma|\.bin$)",
    re.I,
)
MD_KEYS = (
    "readme",
    "admin",
    "workflow",
    "roadmap",
    "plan",
    "arch",
    "summary",
    "correct",
    "impl",
    "feature",
    "overview",
    "spec",
    "guide",
)
CODE_HINTS = (
    "/agents/",
    "/services/",
    "retriever.py",
    "embeddings.py",
    "ai_client.py",
    "orchestrator.py",
    "recommendation",
    "recommender",
    "aiservice",
    "views.py",
    "urls.py",
    "models.py",
    "agent_manager",
    "chains.py",
    "analyzer.py",
    "matcher.py",
    "aipanel",
    "usegithub",
    "lifecycle.py",
    "dispatch.py",
    "teams_driver",
    "zoom_driver",
)


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for zpath in sorted(ROOT.glob("*.zip")):
        dest = OUT / zpath.stem
        dest.mkdir(exist_ok=True)
        print(f"\n### {zpath.name} ({zpath.stat().st_size / 1e6:.1f} MB)")
        try:
            with zipfile.ZipFile(zpath, "r") as zf:
                entries = zf.namelist()
                chosen: list[str] = []
                for e in entries:
                    if SKIP.search(e):
                        continue
                    base = e.replace("\\", "/").rstrip("/")
                    bn = base.split("/")[-1]
                    if NAME_PAT.search(base):
                        chosen.append(e)
                    elif EXTRA_MD.search(bn) and any(k in bn.lower() for k in MD_KEYS):
                        if zf.getinfo(e).file_size < 200_000:
                            chosen.append(e)

                key_code: list[str] = []
                for e in entries:
                    if SKIP.search(e):
                        continue
                    el = e.lower().replace("\\", "/")
                    if any(x in el for x in CODE_HINTS):
                        info = zf.getinfo(e)
                        if info.file_size < 80_000 and el.endswith(
                            (".py", ".js", ".jsx", ".ts", ".tsx", ".md")
                        ):
                            key_code.append(e)

                key_code = sorted(set(key_code), key=lambda x: (x.count("/"), len(x)))[:25]
                chosen = list(dict.fromkeys(sorted(set(chosen))[:40] + key_code))[:60]

                extracted = 0
                for e in chosen:
                    try:
                        info = zf.getinfo(e)
                        if info.is_dir() or info.file_size > 500_000:
                            continue
                        safe = e.replace("\\", "/").lstrip("/")
                        target = dest / safe
                        target.parent.mkdir(parents=True, exist_ok=True)
                        with zf.open(e) as src, open(target, "wb") as dst:
                            dst.write(src.read())
                        extracted += 1
                    except OSError:
                        pass

                tops = sorted({e.split("/")[0] for e in entries if "/" in e})[:8]
                print(f"  extracted {extracted} files -> {dest}")
                print(f"  tops: {tops}")
        except Exception as ex:  # noqa: BLE001
            print(f"  ERROR: {ex}")

    print("\nDONE")


if __name__ == "__main__":
    main()
