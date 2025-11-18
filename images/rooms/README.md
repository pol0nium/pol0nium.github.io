# Room Pictures

This folder contains images for the accommodation page.

## Current Files

### Individual Rooms
- `room1.svg` - Chambre 1 (Double)
- `room2.svg` - Chambre 2 (Double)
- `room3.svg` - Chambre 3 (Familiale)
- `room4.svg` - Chambre 4 (Double)

### Shared Bedroom
- `shared1.svg` - Overview
- `shared2.svg` - Bunk beds view
- `shared3.svg` - Social space

## Replacing Placeholder Images

To replace the placeholder SVG images with real photos:

1. Take photos of each room
2. Optimize them (recommended: 800x600px for rooms, 1200x750px for shared bedroom)
3. Save them as JPG or PNG with the same names:
   - `room1.jpg`, `room2.jpg`, etc.
   - `shared1.jpg`, `shared2.jpg`, `shared3.jpg`
4. Update the file extensions in `hebergement.html`

## Updating Room Status

To update room availability, edit the `hebergement.html` file:

### For Individual Rooms
Find the room row and change the status badge:

```html
<!-- Available -->
<span class="status-badge status-available">Disponible</span>

<!-- Booked -->
<span class="status-badge status-booked">Réservée</span>
```

### For Shared Bedroom Beds
Find the bed row and change:

```html
<!-- Available -->
<span class="status-badge status-available">Disponible</span>

<!-- Booked -->
<span class="status-badge status-booked">Réservé</span>
```

## Adding More Rooms or Beds

To add more rooms, copy an existing `<tr>` row in the rooms table and modify:
- Room number
- Image path
- Room type
- Status

To add more beds, copy a bed row in the beds table and update the bed number and status.

## Adding More Carousel Images

To add more images to the shared bedroom carousel:

1. Add the image to this folder (e.g., `shared4.jpg`)
2. In `hebergement.html`, add a new slide:
   ```html
   <img src="images/rooms/shared4.jpg" alt="Chambre partagée - Vue 4" class="carousel-slide">
   ```
3. Add a new indicator button:
   ```html
   <button class="indicator" data-slide="3" aria-label="Image 4"></button>
   ```

