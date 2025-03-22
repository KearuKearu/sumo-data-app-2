<<<<<<< HEAD
/**
 * Main Application Logic for Sumo Data App
 */

class SumoApp {
    constructor() {
        this.dataFetcher = dataFetcher;
        this.renderer = new RikishiRenderer(this.dataFetcher);
        this.autoRefreshInterval = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async initialize() {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Initialize data fetcher
            const initialData = await this.dataFetcher.initialize();
            
            // Render tournament info
            this.renderer.renderTournamentInfo(initialData.tournament, initialData.day);
            
            // Render first match
            await this.renderCurrentMatch();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Set up auto-refresh (every 60 seconds)
            this.setupAutoRefresh(60);
            
            // Update timestamp
            this.renderer.updateTimestamp();
            
            this.isInitialized = true;
            
            // Hide loading state
            this.hideLoadingState();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showErrorState('Failed to initialize application. Please refresh the page.');
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        // In a real app, you might add a loading spinner or overlay
        document.body.classList.add('loading');
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        document.body.classList.remove('loading');
    }

    /**
     * Show error state
     */
    showErrorState(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Add to body
        document.body.appendChild(errorElement);
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Previous match button
        document.getElementById('prev-match').addEventListener('click', () => {
            this.previousMatch();
        });
        
        // Next match button
        document.getElementById('next-match').addEventListener('click', () => {
            this.nextMatch();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.previousMatch();
            } else if (event.key === 'ArrowRight') {
                this.nextMatch();
            }
        });
    }

    /**
     * Set up auto-refresh
     */
    setupAutoRefresh(intervalSeconds) {
        // Clear any existing interval
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
        
        // Set up new interval
        this.autoRefreshInterval = setInterval(async () => {
            console.log('Auto-refreshing data...');
            
            try {
                // Refresh current tournament and day
                await this.dataFetcher.initialize();
                
                // Re-render current match
                await this.renderCurrentMatch();
                
                // Update timestamp
                this.renderer.updateTimestamp();
                
                console.log('Auto-refresh complete');
            } catch (error) {
                console.error('Error during auto-refresh:', error);
            }
        }, intervalSeconds * 1000);
    }

    /**
     * Render the current match
     */
    async renderCurrentMatch() {
        const currentMatch = this.dataFetcher.getCurrentMatch();
        
        if (!currentMatch) {
            console.error('No match available to render');
            return;
        }
        
        // Render match info
        this.renderer.renderCurrentMatch(currentMatch);
        
        // Render rikishi data
        const eastData = await this.renderer.renderRikishi(currentMatch.east, 'east');
        const westData = await this.renderer.renderRikishi(currentMatch.west, 'west');
        
        // Render head-to-head
        await this.renderer.renderHeadToHead(
            currentMatch.east.id, 
            currentMatch.west.id,
            eastData.shikona,
            westData.shikona
        );
    }

    /**
     * Move to the next match
     */
    async nextMatch() {
        const nextMatch = this.dataFetcher.nextMatch();
        
        if (nextMatch) {
            await this.renderCurrentMatch();
        }
    }

    /**
     * Move to the previous match
     */
    async previousMatch() {
        const prevMatch = this.dataFetcher.previousMatch();
        
        if (prevMatch) {
            await this.renderCurrentMatch();
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SumoApp();
    app.initialize().catch(error => {
        console.error('Failed to start app:', error);
    });
});
=======
/**
 * Main Application Logic for Sumo Data App
 */

class SumoApp {
    constructor() {
        this.dataFetcher = dataFetcher;
        this.renderer = new RikishiRenderer(this.dataFetcher);
        this.autoRefreshInterval = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async initialize() {
        try {
            // Show loading state
            this.showLoadingState();
            
            // Initialize data fetcher
            const initialData = await this.dataFetcher.initialize();
            
            // Render tournament info
            this.renderer.renderTournamentInfo(initialData.tournament, initialData.day);
            
            // Render first match
            await this.renderCurrentMatch();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Set up auto-refresh (every 60 seconds)
            this.setupAutoRefresh(60);
            
            // Update timestamp
            this.renderer.updateTimestamp();
            
            this.isInitialized = true;
            
            // Hide loading state
            this.hideLoadingState();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showErrorState('Failed to initialize application. Please refresh the page.');
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        // In a real app, you might add a loading spinner or overlay
        document.body.classList.add('loading');
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        document.body.classList.remove('loading');
    }

    /**
     * Show error state
     */
    showErrorState(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Add to body
        document.body.appendChild(errorElement);
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Previous match button
        document.getElementById('prev-match').addEventListener('click', () => {
            this.previousMatch();
        });
        
        // Next match button
        document.getElementById('next-match').addEventListener('click', () => {
            this.nextMatch();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.previousMatch();
            } else if (event.key === 'ArrowRight') {
                this.nextMatch();
            }
        });
    }

    /**
     * Set up auto-refresh
     */
    setupAutoRefresh(intervalSeconds) {
        // Clear any existing interval
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
        }
        
        // Set up new interval
        this.autoRefreshInterval = setInterval(async () => {
            console.log('Auto-refreshing data...');
            
            try {
                // Refresh current tournament and day
                await this.dataFetcher.initialize();
                
                // Re-render current match
                await this.renderCurrentMatch();
                
                // Update timestamp
                this.renderer.updateTimestamp();
                
                console.log('Auto-refresh complete');
            } catch (error) {
                console.error('Error during auto-refresh:', error);
            }
        }, intervalSeconds * 1000);
    }

    /**
     * Render the current match
     */
    async renderCurrentMatch() {
        const currentMatch = this.dataFetcher.getCurrentMatch();
        
        if (!currentMatch) {
            console.error('No match available to render');
            return;
        }
        
        // Render match info
        this.renderer.renderCurrentMatch(currentMatch);
        
        // Render rikishi data
        const eastData = await this.renderer.renderRikishi(currentMatch.east, 'east');
        const westData = await this.renderer.renderRikishi(currentMatch.west, 'west');
        
        // Render head-to-head
        await this.renderer.renderHeadToHead(
            currentMatch.east.id, 
            currentMatch.west.id,
            eastData.shikona,
            westData.shikona
        );
    }

    /**
     * Move to the next match
     */
    async nextMatch() {
        const nextMatch = this.dataFetcher.nextMatch();
        
        if (nextMatch) {
            await this.renderCurrentMatch();
        }
    }

    /**
     * Move to the previous match
     */
    async previousMatch() {
        const prevMatch = this.dataFetcher.previousMatch();
        
        if (prevMatch) {
            await this.renderCurrentMatch();
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SumoApp();
    app.initialize().catch(error => {
        console.error('Failed to start app:', error);
    });
});
>>>>>>> 94b2227660de6818c2711751023e91fee341d412
