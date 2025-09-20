# Theming options

Theme of Vue Tailwind Datepicker is customizable, so you can customize your theme with any color you want, via Tailwind CSS configuration. And all will work well.

Just modify your `main.css` to includes the plugin directive for `@tailwindcss/forms` and your `tailwind.config.js` file
```css
@plugin "@tailwindcss/forms";

/* Your tailwindconfig file */
@config "../../tailwind.config.js"
```

```js
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.sky,
        "vtd-secondary": colors.gray,
      },
    },
  },
};
```

## Light mode

Light mode color system using custom color `vtd-primary`.

## Dark mode

Dark mode color system using color palette `vtd-secondary`. Vue Tailwind Datepicker work it well with Tailwind CSS `dark` mode configuration.