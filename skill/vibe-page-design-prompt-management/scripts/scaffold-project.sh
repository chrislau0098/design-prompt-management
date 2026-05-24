#!/usr/bin/env bash
# scaffold-project.sh — create a new design-prompt project from templates
#
# Usage:
#   ./scaffold-project.sh --name <project> --scenario <scenario> --dest <path>
#
# Example:
#   ./scaffold-project.sh --name "my-report" --scenario "campaign-report" --dest ~/Code/my-report

set -euo pipefail

# ── Defaults ──────────────────────────────────────────────────────────────────
PROJECT_NAME=""
SCENARIO=""
DEST=""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATES_DIR="$(cd "$SCRIPT_DIR/../templates" && pwd)"

# ── Argument parsing ──────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --name)
            PROJECT_NAME="$2"
            shift 2
            ;;
        --scenario)
            SCENARIO="$2"
            shift 2
            ;;
        --dest)
            DEST="$2"
            shift 2
            ;;
        -h|--help)
            echo "Usage: $0 --name <project> --scenario <scenario> --dest <path>"
            exit 0
            ;;
        *)
            echo "Unknown argument: $1" >&2
            exit 1
            ;;
    esac
done

# ── Validation ────────────────────────────────────────────────────────────────
if [[ -z "$PROJECT_NAME" || -z "$SCENARIO" || -z "$DEST" ]]; then
    echo "Error: --name, --scenario, and --dest are all required." >&2
    echo "Usage: $0 --name <project> --scenario <scenario> --dest <path>" >&2
    exit 1
fi

TODAY="$(date +%Y-%m-%d)"
PROJECT_DIR="$DEST"

if [[ -e "$PROJECT_DIR" ]]; then
    echo "Error: destination already exists: $PROJECT_DIR" >&2
    exit 1
fi

# ── Directory structure ────────────────────────────────────────────────────────
echo "Creating project structure at: $PROJECT_DIR"

mkdir -p "$PROJECT_DIR/scenarios/$SCENARIO/slot-examples"
mkdir -p "$PROJECT_DIR/scripts"

# ── Copy templates ─────────────────────────────────────────────────────────────
# AGENTS.md
cp "$TEMPLATES_DIR/AGENTS.template.md" "$PROJECT_DIR/AGENTS.md"
sed -i '' \
    -e "s/{{project_name}}/$PROJECT_NAME/g" \
    -e "s/{{scenario}}/$SCENARIO/g" \
    -e "s/{{YYYY-MM-DD}}/$TODAY/g" \
    "$PROJECT_DIR/AGENTS.md"

# Round-Log.md
cp "$TEMPLATES_DIR/Round-Log.template.md" "$PROJECT_DIR/Round-Log.md"
sed -i '' \
    -e "s/{{project_name}}/$PROJECT_NAME/g" \
    -e "s/{{scenario}}/$SCENARIO/g" \
    -e "s/{{YYYY-MM-DD}}/$TODAY/g" \
    "$PROJECT_DIR/Round-Log.md"

# Scenario files
cp "$TEMPLATES_DIR/prompt-template.md" \
    "$PROJECT_DIR/scenarios/$SCENARIO/prompt-template.md"

cp "$TEMPLATES_DIR/PATTERN.template.md" \
    "$PROJECT_DIR/scenarios/$SCENARIO/PATTERN.md"
sed -i '' \
    -e "s/{{project}}/$PROJECT_NAME/g" \
    -e "s/{{scenario}}/$SCENARIO/g" \
    -e "s/{{created}}/$TODAY/g" \
    "$PROJECT_DIR/scenarios/$SCENARIO/PATTERN.md"

cp "$TEMPLATES_DIR/component-spec.template.md" \
    "$PROJECT_DIR/scenarios/$SCENARIO/component-spec.md"
sed -i '' \
    -e "s/{{project_name}}/$PROJECT_NAME/g" \
    -e "s/{{scenario}}/$SCENARIO/g" \
    -e "s/{{YYYY-MM-DD}}/$TODAY/g" \
    "$PROJECT_DIR/scenarios/$SCENARIO/component-spec.md"

# Copy inject.py
cp "$SCRIPT_DIR/inject.py" "$PROJECT_DIR/scripts/inject.py"
cp "$SCRIPT_DIR/inject.README.md" "$PROJECT_DIR/scripts/inject.README.md"

# ── Git init ──────────────────────────────────────────────────────────────────
cd "$PROJECT_DIR"
git init -q
git add .
git commit -q -m "chore: scaffold $PROJECT_NAME · scenario=$SCENARIO · $(date +%Y-%m-%d)"

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "Project scaffolded: $PROJECT_DIR"
echo ""
echo "Next steps:"
echo "  1. Fill AGENTS.md §1 (project definition) and §7 (required reads)"
echo "  2. Edit scenarios/$SCENARIO/PATTERN.md §11-§12 for scenario-specific archetypes"
echo "  3. Run scaffold-style.sh to create your first Slot:"
echo "       ./scripts/scaffold-style.sh --style <handle> --scenario $SCENARIO --project $PROJECT_DIR"
echo "  4. Fill the Slot JSON values (style_meta → atomic → molecular → tooling)"
echo "  5. Run inject.py to render your first Design Prompt:"
echo "       python3 scripts/inject.py --slot scenarios/$SCENARIO/slot-examples/<handle>.slot.json \\"
echo "           --template scenarios/$SCENARIO/prompt-template.md \\"
echo "           --out scenarios/$SCENARIO/Design-Prompt-v0.1.md"
