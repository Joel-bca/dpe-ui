# Scoreboard Dashboard Implementation Plan

## Overview
Implement the scoreboard dashboard with school scores, winners carousel, and interactive graphs based on AWS DynamoDB data (School and Score tables).

## Key Features
- Top 5 schools with overall scores (aggregated from Score table)
- Carousel of event winners (top 3 per event with custom designs for 1st, 2nd, 3rd positions)
- Clickable school scores opening animated bar graph (carousel moves down smoothly)
- Points: 5 for 1st, 3 for 2nd, 1 for 3rd

## Steps
- [ ] Update data fetching logic to aggregate school totals from Score table
- [ ] Implement winner determination: group scores by eventId, sort by points desc, assign positions 1-3
- [ ] Display top 5 schools neatly in a grid
- [ ] Create carousel component for winners with custom backgrounds/designs for each position
- [ ] Add click handler for school scores to open modal with bar chart
- [ ] Implement smooth animation: carousel moves down when graph expands
- [ ] Test data display and interactions
