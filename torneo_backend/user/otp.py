import os
from twilio.rest import Client
from torneo_backend.settings import TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_VERIFICATION_SID


# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
def otp_verify(mobile):
    account_sid = TWILIO_ACCOUNT_SID
    auth_token = TWILIO_AUTH_TOKEN
    verification = TWILIO_VERIFICATION_SID
    # print(account_sid,auth_token)
    client = Client(account_sid, auth_token)

    client.verify.services(verification).verifications.create(
        to='+91' + mobile, channel='sms')


def verify(mobile, otp):
    account_sid = TWILIO_ACCOUNT_SID
    auth_token = TWILIO_AUTH_TOKEN
    verification = TWILIO_VERIFICATION_SID
    print('pass',mobile,otp)
    client = Client(account_sid, auth_token)
    print('pass')
    verification_check = client.verify \
        .services(verification) \
        .verification_checks \
        .create(to='+91'+mobile, code=otp)
    print('pass')
    if verification_check.status == 'approved':
        return True
    else:
        return False
