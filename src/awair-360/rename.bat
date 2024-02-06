@echo off
setlocal ENABLEDELAYEDEXPANSION
set/a fileNum = 0

for %%f in (*.jpeg) do (
  ren %%~nf%%~xf !fileNum!%%~xf
  set/a fileNum += 1
)