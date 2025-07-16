<p align="center">
  <img src="https://github.com/user-attachments/assets/34f7ba98-1bcf-4be0-a065-e9f82e891880" alt="Gradient Generator Logo" width="150">
</p>

<h1 align="center">🎨 Gradient Generator</h1>

<p align="center">
  An intuitive and powerful tool for easily creating and customizing CSS gradients in real-time.
</p>

<p align="center">
  <a href="https://gradient-generatorproject.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-View_Here-blue?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" alt="Project Status">
</p>

## 🌟 About the Project

**Gradient Generator** is a web application designed to simplify the process of creating and customizing CSS gradients. Whether you're a developer, designer, or simply looking for a unique visual touch for your website, this tool allows you to generate linear, radial (and potentially conic in future updates) gradients with a fluid user interface and instant preview. Forget about writing complex CSS code from scratch; with Gradient Generator, you can visualize and adjust your gradients in seconds.

## ✨ Key Features

* **Intuitive User Interface**: Clean and easy-to-use design, allowing for quick adaptation.
* **Gradient Type Support**: Create `linear-gradient` and `radial-gradient` types.
* **Color Stop Control**: Add, remove, and adjust the position of multiple color stops to create complex transitions.
* **Advanced Color Picker**: Integration of an interactive color picker with HEX and RGBA support, allowing precise color and transparency adjustments.
* **Gradient Bar Manipulation**: Drag and drop color stops directly on the gradient preview bar for precise visual control.
* **Real-time Preview**: See how your changes affect the gradient instantly.
* **Angle Adjustment**: Control the direction of linear gradients with an angle selector.
* **Copy CSS Functionality**: Copy the generated CSS gradient code with a single click, ready for use in your projects.
* **Input Validation**: Ensures that color positions and other values are within valid ranges.

## 🚀 Technologies Used

This project is built with a stack of modern and efficient web development technologies:

* **React**: A JavaScript library for building interactive user interfaces and reusable components.
* **Tailwind CSS**: A "utility-first" CSS framework for building custom designs directly in your HTML markup, facilitating rapid development and consistent styling.
* **`react-colorful`**: A small and fast color picker library for React, providing color and transparency selection functionality.
* **JavaScript (ES6+)**: The primary programming language for frontend logic.
* **HTML5**: For the semantic structure of the content.
* **CSS3**: For general styles and presentation.

## ⚙️ Getting Started (Installation)

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

* [Node.js](https://nodejs.org/) (includes npm)

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git)
    cd YOUR_REPOSITORY
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the application in development mode:
    ```bash
    npm run dev
    ```
    The application will open in your browser at `http://localhost:5173` (or a similar port).

## 💡 Usage

1.  **Select Gradient Type**: Choose between "Linear" or "Radial".
2.  **Adjust Angle**: For linear gradients, use the slider or the numeric field to define the angle.
3.  **Manage Color Stops**:
    * Click on the color circles in the preview bar to select them.
    * Use the **Color Picker** to change the color and transparency of the selected stop.
    * Drag the circles directly on the preview bar to adjust their position.
    * In the "Color Stops" section, you can adjust the color (HEX) and position (%) directly in the text fields.
    * Click **"Add Stop"** to add a new color point.
    * Click the "X" to **remove** a stop (a minimum of 2 stops is required).
    * You can also add a stop by clicking directly on the gradient preview bar.
4.  **Copy CSS Code**: Once satisfied with your design, click the "Copy CSS" button to copy the generated code to your clipboard.
