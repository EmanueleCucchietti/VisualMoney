export class GraphicFunctions{
	static blendColors(color1 : string, color2 : string, percentage : number) {
		if (percentage < 0 || percentage > 100) {
			throw new Error("Percentage should be between 0 and 100");
		}

		// Convert hex to RGB
		const hexToRgb = (hex:any) => ({
			r: parseInt(hex.slice(1, 3), 16),
			g: parseInt(hex.slice(3, 5), 16),
			b: parseInt(hex.slice(5, 7), 16),
		});

		const rgb1 = hexToRgb(color1);
		const rgb2 = hexToRgb(color2);

		// Calculate mixed color
		const mixedColor = {
			r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * (percentage / 100)),
			g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * (percentage / 100)),
			b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * (percentage / 100)),
		};

		// Convert RGB to hex
		const componentToHex = (c:any) => {
			const hex = c.toString(16);
			return hex.length === 1 ? "0" + hex : hex;
		};

		const mixedHexColor = `#${componentToHex(mixedColor.r)}${componentToHex(
			mixedColor.g
		)}${componentToHex(mixedColor.b)}`;

		return mixedHexColor;
	}
}