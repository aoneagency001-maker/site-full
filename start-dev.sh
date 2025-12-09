#!/bin/bash
export DYLD_FALLBACK_LIBRARY_PATH=/usr/local/Cellar/simdjson/4.1.0/lib:$DYLD_FALLBACK_LIBRARY_PATH
cd "/Users/vbut/Сайт aoneagency.kz/agency-kit-site"
npm run dev
