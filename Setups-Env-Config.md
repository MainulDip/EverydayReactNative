### Listing and freeing Already used port:
```sh
# lsof comes preinstalled
lsof -i -P -n | grep LISTEN # -n for `do not use dns name`
sudo lsof -i -P -n | grep LISTEN # will spit out root level port as well

# ss comes preinstalled | best for details and readability
sudo ss -lptn
# or
sudo ss -l -p -t -n # -l listening, -p process , -t tcp , -n numeric 

# `netstat` need to be installed first in linux, windows comes preinstalled
sudo netstat -tulpn | grep LISTEN # to list port
```

Check Processes with `ps` command on mac.

Freeing Port
```sh
lsof -i :8081
kill -15 [PID]
kill -9 [PID] # same for linux, mac, win
```

Or using `fuser` in ubuntu

