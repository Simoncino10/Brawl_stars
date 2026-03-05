async function getPlayerData() {
    const tagInput = document.getElementById('playerTag').value.trim();
    const tag = tagInput.replace('#', '').toUpperCase();
    
    // Assicurati che qui ci sia la tua chiave API aggiornata
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjQ1ZDllNGEyLTc2MWUtNDI1Yy1hNTVjLWY4MThjOGZmY2JiZCIsImlhdCI6MTc3Mjc0NTY2MCwic3ViIjoiZGV2ZWxvcGVyLzVjYzRhMmFmLWI4NjUtODVk OC0xZjJjLTg1NzU2ZWI2ZDA1NyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI 6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2 lkcnMiOlsiODIuMTQ1LjEwNS4xMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.vwH0-NsCM8ObQv 8TR9flyXq7ktbJivwkqmjGD0S5alB4_PK_AIJHfPOrVPzUKt0JE1yTxUViRhOSK3AfwEe7bQ"; 

    const resultDiv = document.getElementById('result');
    
    // Proxy alternativo più pulito
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const apiUrl = `https://api.brawlstars.com/v1/players/%23${tag}`;

    if(!tag) {
        alert("Inserisci un Tag!");
        return;
    }

    try {
        const response = await fetch(proxyUrl + encodeURIComponent(apiUrl), {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const dataWrapper = await response.json();
        
        // AllOrigins avvolge la risposta in un oggetto "contents"
        const data = JSON.parse(dataWrapper.contents);

        if (data.reason === "accessDenied") {
            alert("Errore IP: Vai sul sito Supercell e aggiorna la chiave con l'IP che vedi lì.");
            return;
        }

        if (data.name) {
            resultDiv.style.display = 'block';
            document.getElementById('playerName').innerText = data.name;
            document.getElementById('currentTrophies').innerText = data.trophies;
            document.getElementById('highestTrophies').innerText = data.highestTrophies;
            calculateGap();
        } else {
            alert("Giocatore non trovato.");
        }

    } catch (error) {
        console.error(error);
        alert("Errore tecnico. Riprova tra poco.");
    }
}

function calculateGap() {
    const current = parseInt(document.getElementById('currentTrophies').innerText) || 0;
    const goal = parseInt(document.getElementById('goalInput').value);
    const gapDisplay = document.getElementById('gapResult');

    if (goal > current) {
        const diff = goal - current;
        gapDisplay.innerText = `Ti mancano ${diff.toLocaleString()} coppe! 🚀`;
    } else if (goal > 0 && goal <= current) {
        gapDisplay.innerText = "Obiettivo raggiunto! 🏆";
    }
}
