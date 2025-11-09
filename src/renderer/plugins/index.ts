/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addPatch } from "../patches/shared";
import SaniyebopBadge from "./SaniyebopBadge";

console.log("[Equibop Plugins] Plugin index loaded");
console.log("[Equibop Plugins] Vencord available?", !!Vencord);
console.log("[Equibop Plugins] Vencord.Plugins available?", !!Vencord?.Plugins);

/**
 * Generic plugin registration utility
 * Handles patch registration and plugin registration with Vencord
 */
function registerPlugin(plugin: any) {
    console.log(`[Equibop] Attempting to register plugin: ${plugin.name}`);

    // Register patches with Vencord
    if (plugin.patches) {
        addPatch({
            patches: plugin.patches.map(p => ({
                ...p,
                plugin: plugin.name
            }))
        });
        console.log(`[Equibop] Registered ${plugin.patches.length} patches for ${plugin.name}`);
    }

    // Register the plugin itself for settings
    if (Vencord?.Plugins) {
        Vencord.Plugins.plugins[plugin.name] = plugin;
        console.log(`[Equibop] Registered plugin with Vencord: ${plugin.name}`);
    } else {
        console.warn(`[Equibop] Vencord.Plugins not available yet for ${plugin.name}`);
    }

    // Call the plugin's start method if it exists
    if (typeof plugin.start === "function") {
        try {
            plugin.start();
            console.log(`[Equibop] Started plugin: ${plugin.name}`);
        } catch (e) {
            console.error(`[Equibop] Failed to start plugin ${plugin.name}:`, e);
        }
    }
}

// Register all external plugins
const plugins = [UnlimitedAccounts, SaniyebopBadge];

console.log("[Equibop Plugins] Registering", plugins.length, "plugins");
plugins.forEach(registerPlugin);
console.log("[Equibop Plugins] Plugin registration complete");
