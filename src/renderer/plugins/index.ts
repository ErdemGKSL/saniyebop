/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { addPatch } from "../patches/shared";
import SaniyebopBadge from "./SaniyebopBadge";
import UnlimitedAccounts from "./UnlimitedAccounts";

/**
 * Generic plugin registration utility
 * Handles patch registration and plugin registration with Vencord
 */
function registerPlugin(plugin: any) {
    // Register patches with Vencord
    if (plugin.patches) {
        addPatch({
            patches: plugin.patches.map(p => ({
                ...p,
                plugin: plugin.name
            }))
        });
    }

    // Register the plugin itself for settings
    if (Vencord?.Plugins) {
        Vencord.Plugins.plugins[plugin.name] = plugin;
        console.log(`[Equibop] Registered plugin: ${plugin.name}`);
    }
}

// Register all external plugins
const plugins = [UnlimitedAccounts, SaniyebopBadge];

plugins.forEach(registerPlugin);
