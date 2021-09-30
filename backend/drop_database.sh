#!/bin/bash
docker exec -it db bash
mysql -u root -padmin 
drop database if exists quiz_utfpr;
create database quiz_utfpr;