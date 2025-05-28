"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const url_1 = require("url");
const path_1 = require("path");
const module_1 = require("module");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = (0, path_1.dirname)(__filename);
async function createConfig() {
    const plugins = [
        (0, plugin_react_1.default)(),
    ];
    if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
        const { cartographer } = await Promise.resolve().then(() => __importStar(require("@replit/vite-plugin-cartographer")));
        plugins.push(cartographer());
    }
    return (0, vite_1.defineConfig)({
        plugins,
        resolve: {
            alias: {
                "@": (0, path_1.resolve)(__dirname, "client/src"),
                "@shared": (0, path_1.resolve)(__dirname, "shared"),
                "@assets": (0, path_1.resolve)(__dirname, "attached_assets"),
            },
        },
        root: (0, path_1.resolve)(__dirname, "client"),
        build: {
            outDir: (0, path_1.resolve)(__dirname, "dist/public"),
            emptyOutDir: true,
            rollupOptions: {
                external: [...module_1.builtinModules, "node:events"], // <-- add this line
                output: {
                    format: "esm",
                },
            },
        },
    });
}
exports.default = createConfig();
