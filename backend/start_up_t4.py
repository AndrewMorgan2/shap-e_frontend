import os
##Config AWS credentails
os.system('cmd /c "setx AWS_ACCESS_KEY_ID AKIAYK2BMSDMVRDLMEPZ"')
os.system('cmd /c "setx AWS_SECRET_ACCESS_KEY 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"')
os.system('cmd /c "setx AWS_DEFAULT_REGION eu-central-1"')

import boto3
## Startup a T4 

client = boto3.client('ec2', region_name = 'us-west-2')

