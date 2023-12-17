'use client';

import { useTheme } from 'next-themes';

import { colors } from '@/config/colors';

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <div className="my-4 flex flex-wrap justify-center gap-3">
      {Object.keys(colors).map((color) => (
        <button
          key={color}
          className="rounded-full p-4 transition-colors hover:opacity-80"
          style={{
            border: `1px solid ${
              colors[color as keyof typeof colors].foreground
            }`,
            backgroundColor: colors[color as keyof typeof colors].background,
            color: colors[color as keyof typeof colors].foreground,
          }}
          onClick={() => setTheme(color)}
        ></button>
      ))}
    </div>
  );
};
