#!/usr/bin/env node

import { createApp } from '../dist/createApp.js';

const args = process.argv.slice(2);
createApp(args);
