/**
 * Rikishi Renderer for Sumo Data App
 * Handles rendering rikishi data in the UI
 */

class RikishiRenderer {
    constructor(dataFetcher) {
        this.dataFetcher = dataFetcher;
    }

    /**
     * Render tournament information
     */
    renderTournamentInfo(tournament, day) {
        document.getElementById('tournament-name').textContent = tournament.name;
        document.getElementById('day-number').textContent = `Day: ${day}`;
    }

    /**
     * Render current match information
     */
    renderCurrentMatch(match) {
        document.getElementById('current-match').textContent = 
            `Match: ${match.division} #${match.matchNumber}`;
    }
    
    /**
     * Render a rikishi's data
     */
    async renderRikishi(rikishi, side) {
        try {
            // Fetch detailed data
            const rikishiData = await this.dataFetcher.fetchRikishiData(
                rikishi.id, 
                rikishi.shikona, 
                rikishi.rank
            );
            
            // Set basic info
            document.getElementById(`${side}-shikona`).textContent = rikishiData.shikona;
            document.getElementById(`${side}-rank`).textContent = rikishiData.rank;
            
            // Set flag and hometown
            const flagSrc = rikishiData.country === 'Japan' 
                ? 'assets/images/japan-flag.png' 
                : 'assets/images/mongolia-flag.png';
            document.getElementById(`${side}-flag`).src = flagSrc;
            document.getElementById(`${side}-hometown`).textContent = rikishiData.hometown;
            
            // Set photo (in a real app, this would be from sumo.or.jp)
            document.getElementById(`${side}-photo`).src = `assets/images/${side.toLowerCase()}-placeholder.png`;
            
            // Set statistics
            document.getElementById(`${side}-record`).textContent = rikishiData.currentRecord;
            document.getElementById(`${side}-age`).textContent = `${rikishiData.age} years`;
            document.getElementById(`${side}-height`).textContent = 
                `${rikishiData.height} cm (${rikishiData.heightImperial})`;
            document.getElementById(`${side}-weight`).textContent = 
                `${rikishiData.weight} kg (${rikishiData.weightImperial})`;
            document.getElementById(`${side}-highest-rank`).textContent = rikishiData.highestRank;
            document.getElementById(`${side}-heya`).textContent = rikishiData.heya;
            
            // Render current basho results
            this.renderCurrentBashoResults(rikishiData.bashoResults, side);
            
            // Render previous basho results
            this.renderPreviousBasho(rikishiData.previousBasho, side);
            
            return rikishiData;
        } catch (error) {
            console.error(`Error rendering ${side} rikishi:`, error);
            this.renderErrorState(side);
        }
    }
    
    /**
     * Render current basho results for a rikishi
     */
    renderCurrentBashoResults(results, side) {
        const container = document.getElementById(`${side}-current-results`);
        container.innerHTML = ''; // Clear existing content
        
        results.forEach(dayResult => {
            const resultElement = document.createElement('div');
            resultElement.className = 'day-result';
            
            // Day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = dayResult.day;
            
            // Result dot (win/loss/absent)
            const resultDot = document.createElement('div');
            resultDot.className = `result-dot ${dayResult.result}`;
            
            // Opponent
            const opponent = document.createElement('div');
            opponent.className = 'opponent-name';
            opponent.title = dayResult.opponent; // For hover tooltip
            opponent.textContent = dayResult.opponent;
            
            // Assemble and add to container
            resultElement.appendChild(dayNumber);
            resultElement.appendChild(resultDot);
            resultElement.appendChild(opponent);
            container.appendChild(resultElement);
        });
    }
    
    /**
     * Render previous basho results for a rikishi
     */
    renderPreviousBasho(results, side) {
        const container = document.getElementById(`${side}-previous-basho`);
        container.innerHTML = ''; // Clear existing content
        
        results.forEach(basho => {
            const bashoElement = document.createElement('div');
            bashoElement.className = 'previous-basho-item';
            
            // Basho name
            const bashoName = document.createElement('div');
            bashoName.className = 'basho-name';
            bashoName.textContent = basho.name;
            
            // Rank
            const rank = document.createElement('div');
            rank.className = 'basho-rank';
            rank.textContent = basho.rank;
            
            // Record
            const record = document.createElement('div');
            record.className = 'basho-record';
            record.textContent = basho.record;
            
            // Assemble and add to container
            bashoElement.appendChild(bashoName);
            bashoElement.appendChild(rank);
            bashoElement.appendChild(record);
            container.appendChild(bashoElement);
        });
    }
    
    /**
     * Render head-to-head record
     */
    async renderHeadToHead(eastId, westId, eastShikona, westShikona) {
        try {
            const headToHead = await this.dataFetcher.fetchHeadToHead(eastId, westId);
            
            const recordElement = document.getElementById('head-to-head-record');
            recordElement.textContent = `${eastShikona} ${headToHead.eastWins} - ${headToHead.westWins} ${westShikona}`;
            
            return headToHead;
        } catch (error) {
            console.error('Error rendering head-to-head:', error);
            document.getElementById('head-to-head-record').textContent = 'N/A';
        }
    }
    
    /**
     * Render error state for a rikishi
     */
    renderErrorState(side) {
        document.getElementById(`${side}-shikona`).textContent = 'Data unavailable';
        document.getElementById(`${side}-rank`).textContent = 'Error loading data';
        document.getElementById(`${side}-record`).textContent = '0-0';
        document.getElementById(`${side}-age`).textContent = '--';
        document.getElementById(`${side}-height`).textContent = '--- cm (-- ft -- in)';
        document.getElementById(`${side}-weight`).textContent = '--- kg (--- lbs)';
        document.getElementById(`${side}-highest-rank`).textContent = '--';
        document.getElementById(`${side}-heya`).textContent = '--';
    }
    
    /**
     * Update the last updated timestamp
     */
    updateTimestamp() {
        const now = new Date();
        const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        document.getElementById('last-updated').textContent = `Last updated: ${timestamp}`;
    }