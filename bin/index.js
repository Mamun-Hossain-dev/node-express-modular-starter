#!/usr/bin/env node

import { createApp } from '../src/createApp.js';

const args = process.argv.slice(2);
createApp(args);
