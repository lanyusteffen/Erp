#!/bin/bash
kill $(sudo lsof -t -i:4200)
ng serve --port 4200 --proxy-config proxy.conf.json