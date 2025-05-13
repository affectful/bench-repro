Browser: Chrome 132.0.0.0, OS: macOS 10.15.7, Env: DEV
30 runs of each table variant at size 100 x 12.

| Variant                  | Avg (ms)        | Relative to RN  |
|--------------------------|-----------------|-----------------|
| react-web                | 27.91           | 23%             |
| emotion-web              | 74.95           | 63%             |
| react-strict-dom         | 28.88           | 24%             |
| styled-components-web    | 51.80           | 43%             |
| react-native             | 119.84          | 100%            |
| tamagui                  | 198.09          | 165%            |
| emotion                  | 149.02          | 124%            |
| styled-components        | 147.39          | 123%            |
| styled-components-wr     | 148.76          | 124%            |