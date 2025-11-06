// eslint.config.js
// ESLint v9 Flat Config
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

/**
 * 커스텀 플러그인: useState를 최상단에 강제
 * - 함수 본문(BlockStatement) 내에서 VariableDeclaration만 검사 (일반적인 훅 선언 패턴 대상)
 * - 첫 useState 이전에 useMemo/useCallback/useEffect 등이 나오면 에러
 *   (요구사항에 맞춰 useMemo만 강제 대상으로 잡아도 되지만, 확장성 위해 대표 훅 포함)
 */
const hooksOrderPlugin = {
  rules: {
    "use-state-first": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Enforce all useState declarations appear before other hooks (e.g., useMemo)",
        },
        schema: [],
        messages: {
          beforeState:
            "All useState declarations must come before {{hook}}. Move this {{hook}} below the last useState.",
        },
      },
      create(context) {
        function checkFunctionBody(blockNode) {
          if (!blockNode || blockNode.type !== "BlockStatement") return;

          let seenAnyUseState = false;

          const TARGET_HOOKS = new Set([
            "useMemo",
            // 필요 시 다음도 포함 가능:
            // "useCallback", "useEffect", "useRef", "useReducer", ...
          ]);

          for (const stmt of blockNode.body) {
            if (stmt.type !== "VariableDeclaration") continue;

            for (const decl of stmt.declarations) {
              const init = decl.init;
              if (!init || init.type !== "CallExpression") continue;

              // Identifier 형태만 엄격히 검사 (가장 일반적인 형태)
              if (init.callee.type === "Identifier") {
                const name = init.callee.name;

                if (name === "useState") {
                  seenAnyUseState = true;
                } else if (TARGET_HOOKS.has(name) && !seenAnyUseState) {
                  context.report({
                    node: init.callee,
                    messageId: "beforeState",
                    data: { hook: name },
                  });
                }
              }
            }
          }
        }

        return {
          // function Foo() { ... }
          FunctionDeclaration(node) {
            if (node.body) checkFunctionBody(node.body);
          },
          // const Foo = () => { ... }
          VariableDeclarator(node) {
            if (
              node.init &&
              node.init.type === "ArrowFunctionExpression" &&
              node.init.body &&
              node.init.body.type === "BlockStatement"
            ) {
              checkFunctionBody(node.init.body);
            }
          },
        };
      },
    },
  },
};

export default [
  {
    ignores: ["dist", "build", "node_modules"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooks,
      "hooks-order": hooksOrderPlugin,
    },
    rules: {
      // ✅ Hook 규칙 엄격 적용
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      // ✅ useState-먼저 규칙
      "hooks-order/use-state-first": "error",

      // ✅ Prettier와 충돌 최소화
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "no-trailing-spaces": "error",
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  // Prettier 호환
  {
    rules: {
      "prettier/prettier": "off", // flat config에선 별도 플러그인 없이 사용
    },
  },
];