# Animated Tag Loader & After Effects Animation Editor

This repository contains two React components developed using React and Tailwind CSS:

1. **Animated Tag Loader Component**: A component designed to handle the loading and testing of modified tags, typically script tags containing JSON objects. These tags have been adjusted to log events on the console instead of making requests to a tracking server. The component facilitates event recording, selection, and interaction testing.

2. **After Effects Animation Editor**: An application for importing, editing, and exporting After Effects animation files. It provides a user-friendly interface for modifying animation properties such as layer positions, colors, and opacities. The edited animation can be previewed and exported as a single HTML/JS file for web rendering.

## Animated Tag Loader Component

### Features:
- Dynamic Loading of Modified Tags
- Event Recording and Logging
- Event Selection for Testing
- Automatic Selection of Essential Events
- Interactive Testing with Ad Unit

### Technologies Used:
- React
- Tailwind CSS
- JavaScript

### Usage:
1. Import the `ModifiedTagLoader` component into your React application.
2. Pass relevant props such as script ID, source, and data containing identifying information and DSP macros.
3. Customize event selection and interaction options as needed.
4. Monitor console logs for recorded events during testing.

## After Effects Animation Editor

### Features:
- Animation Playback within UI
- User Interface for Editing Animation Properties
- Animation Editing Functionality
- Canvas Rendering of Edited Animation
- Export as HTML/JS File for Rendering

### Technologies Used:
- React
- Tailwind CSS
- JavaScript
- After Effects (Input source for animation files)

### Usage:
1. Upload an After Effects animation file using the provided interface.
2. Use the UI controls to edit animation properties such as layer positions, colors, and opacities.
3. Preview the edited animation within the application.
4. Export the animation as a single HTML/JS file for rendering on web pages.

Feel free to customize and extend the functionalities of both components based on your specific requirements and use cases.

For detailed implementation instructions and code examples, refer to the respective component files within the project repository.
