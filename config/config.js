{
    "webPort": 8000,
    "audioCodec": "PCMU",
    "stunServer": "stun.sipnet.ru:3478",
    "dataStorageDays": 100,
    "bitrix24": {
        "portal_link": "",
        "client_id": "",
        "client_secret": "",
        "grant_type": "",
        "redirect_uri": ""
    },
    "repository": "https://raw.githubusercontent.com/komunikator/mars/master/package.json",
    "webAccounts": [
        {
            "username": "admin",
            "password": "admin"
        },
        {
            "username": "user_XXXXXXXXXX"
        }
    ],
    "trustedNet": {
        "tokenURL": "https://net.trusted.ru/idp/sso/oauth/token",
        "profileURL": "https://net.trusted.ru/trustedapp/rest/person/profile/get",
        "redirect_uri": "/auth/trusted",
        "client_id": "TRUSTED_LOGIN_CLIENT_ID",
        "client_secret": "TRUSTED_LOGIN_CLIENT_SECRET"
    },
    "maxCalls": 10,
    "ringingTimeout": "90",
    "serviceName": "MARS",
    "activeAccount": 0,
    "def_tts": "yandex",
    "ivona_speech": {
        "accessKey": "",
        "secretKey": "",
        "language": "ru-RU",
        "name": "Tatyana",
        "gender": "Female"
    },
    "recognize": {
        "type": "yandex",
        "options": {
            "developer_key": "",
            "model": "general"
        }
    },
    "sipAccounts": {
        "1": {
            "host": "multifon.ru",
            "expires": 60,
            "user": "USER",
            "password": "PASSWORD",
            "disable": 1
        }
    },
    "b24accounts": {
        "test1": {
            "disable": 1,
            "clientId": "APP_CLIENT_ID",
            "clientSecret": "APP_CLIENT_SECRET",
            "portalLink": "LINK_MY_PORTAL_BITRIX24",
            "redirectUri": "MY_DOMAIN:PORT"
        }
    },
    "logger": {
        "format": "YYYY-MM-DD hh:mm:ss",
        "dbConnect": ""
    },
    "sipServer": "disable"
}
