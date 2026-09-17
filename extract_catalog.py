import os
import json
import re

BASE_DIR = r"c:\Users\Administrator\OneDrive\Desktop\agency agent"
REPO_DIR = os.path.join(BASE_DIR, "agency-agents")
OUTPUT_FILE = os.path.join(BASE_DIR, "agents_catalog.json")

DIVISIONS_FILE = os.path.join(REPO_DIR, "divisions.json")
with open(DIVISIONS_FILE, "r", encoding="utf-8") as f:
    divisions_meta = json.load(f)["divisions"]

agents = []

for div_name, div_info in divisions_meta.items():
    div_dir = os.path.join(REPO_DIR, div_name)
    if not os.path.exists(div_dir):
        continue
    for fname in sorted(os.listdir(div_dir)):
        if not fname.endswith(".md"):
            continue
        fpath = os.path.join(div_dir, fname)
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Parse frontmatter
        name = ""
        description = ""
        color = div_info.get("color", "#3b82f6")
        emoji = "🤖"
        vibe = ""
        
        fm_match = re.search(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
        if fm_match:
            fm_text = fm_match.group(1)
            for line in fm_text.splitlines():
                if line.startswith("name:"):
                    name = line[5:].strip().strip('"\'')
                elif line.startswith("description:"):
                    description = line[12:].strip().strip('"\'')
                elif line.startswith("color:"):
                    color = line[6:].strip().strip('"\'')
                elif line.startswith("emoji:"):
                    emoji = line[6:].strip().strip('"\'')
                elif line.startswith("vibe:"):
                    vibe = line[5:].strip().strip('"\'')
        
        if not name:
            name = fname.replace(".md", "").replace(f"{div_name}-", "").replace("-", " ").title()
        
        slug = fname.replace(".md", "")
        
        claude_prompt = f"Hey Claude, activate {name} mode and help me with my task."
        direct_prompt = f"Use the {name} agent to review and implement this."
        
        agents.append({
            "name": name,
            "slug": slug,
            "division": div_name,
            "divisionLabel": div_info.get("label", div_name.title()),
            "divisionColor": div_info.get("color", "#3b82f6"),
            "color": color,
            "emoji": emoji,
            "vibe": vibe,
            "description": description,
            "filename": fname,
            "claudePrompt": claude_prompt,
            "directPrompt": direct_prompt
        })

print(f"Parsed {len(agents)} agents across {len(divisions_meta)} divisions.")

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump({
        "total": len(agents),
        "divisions": divisions_meta,
        "agents": agents
    }, f, indent=2, ensure_ascii=False)

print(f"Catalog saved to {OUTPUT_FILE}")
