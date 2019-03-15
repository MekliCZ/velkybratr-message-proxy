# VB Message Proxy

## Fungování

### Klient

Klient se připojí na WebSocket server a pošle zprávu s ID klienta:

```json
{
	"type": "start",
	"id": 123
}
```

Když na server přijde nová zpráva, dostane klient od serveru zprávu s ID konverzace:

```json
{
	"chatId": 123
}
```

### Backend

VB backend při každé odeslané zprávě pošle GET request na URL `//server/?userIds=1,2,3,123,255&chatId=275`,
kde `userIds` jsou ID klientů oddělená čárkou a `chatId` je ID konverzace.
