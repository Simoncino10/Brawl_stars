const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQ0M2NmMGVlLWU5NGEtNDEwMy05MzBlLWRmMTc1OTk5OWMyOSIsImlhdCI6MTc3Mjc0OTM3Nywic3ViIjoiZGV2ZWxvcGVyLzVjYzRhMmFmLWI4NjUt ODVkOC0xZjJjLTg1NzU2ZWI2ZDA1NyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMC4wLjAuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.fqaSU9oZ-2VujTJFi_HzmRbLrmYqc5wyesMAFaI5mZxL7TuGI5ic2inXraQeEuR3vYkGT7CfRi9GTyu_eOWpgg"; // <--- INCOLLA QUI IL TOKEN

async function getPlayerData() {
    let tag = document.getElementById('playerTag').value.toUpperCase();
    if (!tag.startsWith('#')) tag = '#' + tag;
    const cleanTag = tag.replace('#', '');
    
    const resultDiv = document.getElementById('result');
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const apiUrl = `https://api.brawlstars.com/v1/players/%23${cleanTag}`;

    try {
        const response = await fetch(`${proxyUrl}${encodeURIComponent(apiUrl)}`, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        const dataJson = await response.json();
        const data = JSON.parse(dataJson.contents);

        if (data.reason === "accessDenied") {
            alert("Errore IP: Assicurati di aver messo 0.0.0.0/0 sul sito Supercell.");
            return;
        }

        resultDiv.style.display = 'block';
        document.getElementById('playerName').innerText = data.name;
        document.getElementById('currentTrophies').innerText = data.trophies;
        document.getElementById('highestTrophies').innerText = data.highestTrophies;
        calculateGap();
    } catch (e) {
        alert("Errore nel caricamento dati.");
    }
}

function calculateGap() {
    const current = parseInt(document.getElementById('currentTrophies').innerText) || 0;
    const goal = parseInt(document.getElementById('goalInput').value) || 0;
    const gapDisplay = document.getElementById('gapResult');
    if (goal > current) {
        gapDisplay.innerText = `Ti mancano ${goal - current} coppe! 🚀`;
    } else {
        gapDisplay.innerText = goal > 0 ? "Traguardo raggiunto! 🏆" : "";
    }
}
