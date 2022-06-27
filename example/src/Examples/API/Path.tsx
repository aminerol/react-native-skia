/* eslint-disable max-len */
import React, { useMemo } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Skia,
  PathOp,
  Canvas,
  Path,
  Group,
  rect,
  TextPath,
  useFont,
  FitBox,
  useComputedValue,
  interpolatePaths,
  useTiming,
  Easing,
} from "@shopify/react-native-skia";

import { Title } from "./components/Title";
import {
  Backface,
  CARD_HEIGHT,
  CARD_WIDTH,
} from "./components/drawings/backface";

const angryPath = Skia.Path.Make();
angryPath.moveTo(16, 25);
angryPath.cubicTo(32.2, 27.09, 43.04, 28.2, 48.51, 28.34);
angryPath.cubicTo(53.99, 28.48, 62.15, 27.78, 73, 26.25);
angryPath.cubicTo(66.28, 53.93, 60.19, 69.81, 54.74, 73.88);
angryPath.cubicTo(50.63, 76.96, 40.4, 74.65, 27.48, 54.51);
angryPath.cubicTo(24.68, 50.15, 20.85, 40.32, 27.48, 54.51);
angryPath.close();

const normalPath = Skia.Path.Make();
normalPath.moveTo(20.9, 30.94);
normalPath.cubicTo(31.26, 31.66, 38.61, 32.2, 42.96, 32.56);
normalPath.cubicTo(66.94, 34.53, 79.65, 36.45, 81.11, 38.32);
normalPath.cubicTo(83.9, 41.9, 73.77, 56.6, 65.83, 59.52);
normalPath.cubicTo(61.95, 60.95, 45.72, 58.91, 32.42, 49.7);
normalPath.cubicTo(23.56, 43.56, 19.71, 37.3, 20.9, 30.94);
normalPath.close();

const goodPath = Skia.Path.Make();
goodPath.moveTo(21, 45);
goodPath.cubicTo(21, 36.78, 24.26, 29.42, 29.41, 24.47);
goodPath.cubicTo(33.61, 20.43, 38.05, 18, 45, 18);
goodPath.cubicTo(58.25, 18, 69, 30.09, 69, 45);
goodPath.cubicTo(69, 59.91, 58.25, 72, 45, 72);
goodPath.cubicTo(31.75, 72, 21, 59.91, 21, 45);
goodPath.close();

const c1 = angryPath.computeTightBounds();

const path1 = Skia.Path.Make();
path1.moveTo(0, 0);
path1.lineTo(100, 100);
const path2 = Skia.Path.Make();
path2.moveTo(100, 100);
path2.lineTo(0, 0);
const path3 = Skia.Path.Make();
path3.moveTo(50, 50);
path3.lineTo(50, 50);

const strokeWidth = 10;
const r = 32;
const d = 2 * r;
const example1Height = 150;

const s = Skia.Path.MakeFromSVGString(
  "M73.1761 184.56C57.9867 184.56 44.9307 182.256 34.0081 177.648C23.0854 173.04 14.8081 166.982 9.17606 159.472C3.54406 151.963 0.557398 143.856 0.216064 135.152C0.216064 133.616 0.728065 132.336 1.75206 131.312C2.77606 130.288 4.05606 129.776 5.59206 129.776H28.3761C30.4241 129.776 31.9601 130.203 32.9841 131.056C34.1787 131.739 35.2881 132.934 36.3121 134.64C38.0187 140.443 41.9441 145.307 48.0881 149.232C54.2321 153.158 62.5947 155.12 73.1761 155.12C85.2934 155.12 94.4241 153.158 100.568 149.232C106.712 145.136 109.784 139.504 109.784 132.336C109.784 127.558 108.163 123.632 104.92 120.56C101.848 117.488 97.1547 114.843 90.8401 112.624C84.6961 110.406 75.4801 107.675 63.1921 104.432C43.0534 99.6536 28.2907 93.3389 18.9041 85.4882C9.68806 77.4669 5.08006 66.1176 5.08006 51.4402C5.08006 41.5416 7.7254 32.7522 13.0161 25.0722C18.4774 17.3922 26.2427 11.3336 36.3121 6.89624C46.5521 2.4589 58.4134 0.240234 71.8961 0.240234C85.8907 0.240234 98.0081 2.7149 108.248 7.66423C118.488 12.6136 126.253 18.8429 131.544 26.3522C137.005 33.6909 139.907 41.0296 140.248 48.3682C140.248 49.9042 139.736 51.1842 138.712 52.2082C137.688 53.2322 136.408 53.7442 134.872 53.7442H111.064C107.48 53.7442 105.005 52.1229 103.64 48.8802C102.616 43.4189 99.2027 38.8962 93.4001 35.3122C87.5974 31.5576 80.4294 29.6802 71.8961 29.6802C62.3387 29.6802 54.8294 31.4722 49.3681 35.0562C43.9067 38.6402 41.1761 43.8456 41.1761 50.6722C41.1761 55.4509 42.5414 59.3762 45.2721 62.4482C48.0027 65.5202 52.2694 68.2509 58.0721 70.6402C64.0454 73.0296 72.5787 75.6749 83.6721 78.5762C98.6907 81.9896 110.637 85.8296 119.512 90.0962C128.557 94.3629 135.213 99.7389 139.48 106.224C143.747 112.71 145.88 120.987 145.88 131.056C145.88 141.979 142.808 151.536 136.664 159.728C130.691 167.75 122.157 173.894 111.064 178.16C100.141 182.427 87.5121 184.56 73.1761 184.56Z"
)!;
s.offset(16, 16);
s.stroke({
  width: 10,
});

export const PathExample = () => {
  const progress = useTiming(
    { to: 1, loop: true },
    { duration: 3000, easing: Easing.bezier(0.65, 0, 0.35, 1) }
  );
  const { width } = useWindowDimensions();
  const SIZE = width;
  const rect1 = useMemo(() => {
    const retVal = Skia.Path.Make();
    retVal.addRect(
      rect(strokeWidth / 2, (example1Height - d) / 2, SIZE - strokeWidth, 70)
    );
    return retVal;
  }, [SIZE]);

  const circle = useMemo(() => {
    const c = Skia.Path.Make();
    c.addCircle(SIZE / 2, example1Height / 2 - d / 2, r);
    return c;
  }, [SIZE]);

  const result = useMemo(() => {
    const rr = Skia.Path.MakeFromOp(rect1, circle, PathOp.Difference)!;
    rr.simplify();
    return rr;
  }, [circle, rect1]);

  const font = useFont(require("./Roboto-Regular.otf"), 32);
  const path = useComputedValue(
    () =>
      interpolatePaths(
        progress.current,
        [0, 0.5, 1],
        [angryPath, normalPath, goodPath]
      ),
    [progress]
  );
  if (!font) {
    return null;
  }
  const textPath = Skia.Path.MakeFromText("hello", 16, 16 + 32, font)!;
  return (
    <ScrollView>
      <Title>Path Operations</Title>
      <Canvas style={{ ...styles.container, width: SIZE }}>
        <Group style="stroke" color="#fb61da" strokeWidth={2}>
          <Path
            path={result}
            color="#61DAFB"
            strokeWidth={strokeWidth}
            strokeJoin="round"
          />
          <Path path={circle} />
          <Path path={rect1} />
        </Group>
      </Canvas>
      <Title>Paths</Title>
      <View style={{ ...styles.cardContainer, width: SIZE }}>
        <Canvas style={styles.card}>
          <Backface />
        </Canvas>
      </View>
      <Title>Stroke</Title>
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <Path path={s} color="black" style="stroke" strokeWidth={1} />
      </Canvas>
      <Title>Text Path</Title>
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <Path path={textPath} color="black" style="stroke" strokeWidth={1} />
        <Group transform={[{ translateY: 25 }]}>
          <TextPath path={circle} font={font} text="Hello World!" />
        </Group>
      </Canvas>
      <Title>Fit Box</Title>
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <FitBox src={rect(0, 0, 664, 308)} dst={rect(0, 0, SIZE, SIZE)}>
          <Path path="M 170.1 215.5 C 165 222.3 166.3 232 173.2 237.2 C 180 242.3 189.7 241 194.8 234.2 L 170.1 215.5 Z M 261.3 16.8 L 265.6 1.9 C 265.4 1.9 265.3 1.8 265.1 1.8 L 261.3 16.8 Z M 210.5 95.8 L 195.3 92.8 C 195.3 92.9 195.3 92.9 195.3 92.9 L 210.5 95.8 Z M 182.5 289.4 L 167.1 287.5 C 166.2 295.4 171.3 302.6 178.9 304.4 C 186.6 306.2 194.4 302 197.1 294.6 L 182.5 289.4 Z M 146.3 78.8 C 152.1 85.1 161.9 85.5 168.2 79.8 C 174.5 74 174.9 64.2 169.1 57.9 L 146.3 78.8 Z M 54.4 105.1 L 69.4 101.2 L 69.4 101.2 L 54.4 105.1 Z M 99.7 157.5 L 92 170.9 L 92 170.9 L 99.7 157.5 Z M 153.5 224.8 L 138.1 225.8 L 138.1 225.8 L 153.5 224.8 Z M 23.6 263.3 C 16.1 259.1 6.7 261.8 2.6 269.3 C -1.6 276.8 1.1 286.2 8.6 290.3 L 23.6 263.3 Z M 237.9 184.4 L 247.6 196.4 C 247.6 196.4 247.7 196.4 247.7 196.4 L 237.9 184.4 Z M 270.1 171.9 L 269.2 156.5 C 269.2 156.5 269.2 156.5 269.1 156.5 L 270.1 171.9 Z M 237.4 209.6 C 229.1 208 220.9 213.4 219.3 221.8 C 217.6 230.2 223.1 238.3 231.4 240 L 237.4 209.6 Z M 237.3 209.6 C 228.9 208.1 220.8 213.6 219.2 222 C 217.7 230.4 223.2 238.5 231.6 240.1 L 237.3 209.6 Z M 273.2 276.7 L 287.7 271.3 C 287.7 271.2 287.7 271.2 287.7 271.1 L 273.2 276.7 Z M 280 285.8 L 270.6 298.1 C 270.6 298.1 270.7 298.1 270.7 298.2 L 280 285.8 Z M 346.9 251.6 L 334.1 242.9 C 333.8 243.3 333.6 243.7 333.4 244.1 L 346.9 251.6 Z M 403.7 179.8 C 407.5 172.1 404.4 162.8 396.7 159 C 389.1 155.2 379.8 158.4 376 166 L 403.7 179.8 Z M 404.2 178.6 C 407.4 170.7 403.5 161.7 395.6 158.5 C 387.7 155.4 378.7 159.2 375.5 167.2 L 404.2 178.6 Z M 364.3 249.2 L 349.2 245.9 C 349.1 246.4 349 246.8 348.9 247.3 L 364.3 249.2 Z M 378.8 290.7 L 375.2 305.7 L 375.3 305.7 L 378.8 290.7 Z M 455.6 225.7 L 470.7 229.1 L 470.7 229.1 L 455.6 225.7 Z M 559.6 218.3 C 561.9 226.5 570.5 231.3 578.7 228.9 C 586.9 226.6 591.7 218 589.3 209.8 L 559.6 218.3 Z M 559.6 218.3 C 561.9 226.5 570.5 231.3 578.7 228.9 C 586.9 226.6 591.7 218 589.3 209.8 L 559.6 218.3 Z M 455.6 225.7 L 440.5 222.3 C 440.4 222.6 440.4 223 440.3 223.3 L 455.6 225.7 Z M 472.2 278.4 L 462.3 290.3 C 462.3 290.3 462.4 290.3 462.4 290.4 L 472.2 278.4 Z M 496.2 289.4 L 498.9 274.1 L 498.9 274.1 L 496.2 289.4 Z M 538.4 282.8 L 531.2 269.1 L 531.2 269.1 L 538.4 282.8 Z M 540.8 281.5 L 548.5 294.9 C 548.5 294.9 548.6 294.8 548.6 294.8 L 540.8 281.5 Z M 570.7 235.9 L 555.4 234 C 555.4 234 555.4 234 555.4 234 L 570.7 235.9 Z M 600 176.6 C 602.3 168.4 597.4 159.8 589.2 157.6 C 580.9 155.3 572.4 160.2 570.2 168.4 L 600 176.6 Z M 600 176.6 C 602.3 168.3 597.4 159.8 589.2 157.6 C 580.9 155.3 572.4 160.2 570.2 168.4 L 600 176.6 Z M 571.3 270.6 L 586.3 266.9 C 586.3 266.8 586.3 266.8 586.3 266.8 L 571.3 270.6 Z M 600 288.6 L 603.2 303.7 C 603.2 303.7 603.2 303.7 603.2 303.7 L 600 288.6 Z M 660.6 257 C 665.2 249.8 663.1 240.3 655.9 235.7 C 648.7 231.1 639.1 233.2 634.5 240.5 L 660.6 257 Z M 194.8 234.2 C 245.1 167.7 271.3 115.5 281.9 78.2 C 287.2 59.6 289 43.8 287.2 31.3 C 285.5 19.3 279.6 6 265.6 1.9 L 256.9 31.6 C 253.6 30.7 255.6 28.5 256.6 35.6 C 257.5 42.2 256.8 53.4 252.2 69.7 C 242.9 102 219.1 150.8 170.1 215.5 L 194.8 234.2 Z M 265.1 1.8 C 256.1 -0.5 247.5 2.1 240.7 6.2 C 233.8 10.3 227.5 16.6 222 24.3 C 210.9 39.7 201.2 62.6 195.3 92.8 L 225.7 98.7 C 230.9 71.6 239.3 53.2 247.1 42.4 C 251 37 254.4 34.1 256.6 32.7 C 259 31.3 259 32.2 257.4 31.8 L 265.1 1.8 Z M 195.3 92.9 C 182.7 159.6 177.8 197.6 167.1 287.5 L 197.9 291.2 C 208.5 201.4 213.3 164.3 225.7 98.6 L 195.3 92.9 Z M 169.1 57.9 C 137.6 23.6 101.1 16.1 72.8 30.5 C 45.6 44.3 31 76.4 39.5 109 L 69.4 101.2 C 64.4 82 73.2 65 86.8 58 C 99.4 51.7 121.4 51.7 146.3 78.8 L 169.1 57.9 Z M 39.5 109 C 45.5 132.1 62.7 154.2 92 170.9 L 107.4 144 C 83.6 130.5 72.9 114.6 69.4 101.2 L 39.5 109 Z M 92 170.9 C 126.2 190.4 137.1 210.8 138.1 225.8 L 169 223.9 C 167.2 194.6 146.6 166.4 107.4 144 L 92 170.9 Z M 138.1 225.8 C 139.1 242.8 127.6 260.2 105.5 269.9 C 83.9 279.3 53.8 280 23.6 263.3 L 8.6 290.3 C 47 311.6 87.2 311.6 117.9 298.2 C 148.2 285 171.1 257.5 169 223.9 L 138.1 225.8 Z M 197.1 294.6 C 205.2 272 210.8 253.3 218.5 236.3 C 226 219.9 234.7 206.8 247.6 196.4 L 228.3 172.3 C 210.3 186.7 199 204.5 190.4 223.5 C 182 242 175.4 263.5 167.9 284.1 L 197.1 294.6 Z M 247.7 196.4 C 254.3 191 262.4 187.9 271 187.4 L 269.1 156.5 C 254.2 157.4 239.9 162.9 228.2 172.3 L 247.7 196.4 Z M 270.9 187.4 C 280.1 186.9 284.1 189.8 285.5 191.4 C 286.9 193 287.5 195.3 286.5 198.2 C 284.8 203.1 273.5 216.8 237.4 209.6 L 231.4 240 C 274.6 248.6 306.7 234.4 315.8 208.3 C 320.1 195.7 318 181.6 308.9 171.1 C 299.8 160.6 285.6 155.6 269.2 156.5 L 270.9 187.4 Z M 407.8 145.7 C 425.5 145.7 439.8 131.4 439.8 113.7 H 408.9 C 408.9 114.3 408.4 114.8 407.8 114.8 V 145.7 Z M 439.8 113.7 C 439.8 96 425.5 81.7 407.8 81.7 V 112.6 C 408.4 112.6 408.9 113.1 408.9 113.7 H 439.8 Z M 407.8 81.7 C 390.1 81.7 375.8 96 375.8 113.7 H 406.7 C 406.7 113.1 407.2 112.6 407.8 112.6 V 81.7 Z M 375.8 113.7 C 375.8 131.4 390.1 145.7 407.8 145.7 V 114.8 C 407.2 114.8 406.7 114.3 406.7 113.7 H 375.8 Z M 231.6 240.1 C 238.4 241.3 242.1 243.1 244.2 244.7 C 246.2 246.1 247.6 247.9 248.9 250.6 C 250.3 253.7 251.4 257.5 252.9 263.2 C 254.3 268.5 256.1 275.3 258.8 282.4 L 287.7 271.1 C 285.7 266 284.4 261 282.9 255.3 C 281.5 250 279.7 243.5 276.9 237.4 C 273.9 231 269.4 224.8 262.5 219.7 C 255.6 214.7 247.3 211.5 237.3 209.6 L 231.6 240.1 Z M 258.8 282.2 C 261.2 288.5 265.2 294 270.6 298.1 L 289.4 273.5 C 288.6 272.9 288.1 272.1 287.7 271.3 L 258.8 282.2 Z M 270.7 298.2 C 279.8 305 290.3 306.3 299.7 304.8 C 308.8 303.4 317.5 299.4 325 294.8 C 339.8 285.6 353.5 271.5 360.4 259.2 L 333.4 244.1 C 329.4 251.2 319.6 261.7 308.7 268.5 C 303.3 271.8 298.6 273.7 295 274.2 C 291.6 274.7 290.1 274.1 289.3 273.4 L 270.7 298.2 Z M 359.6 260.4 C 377.2 234.7 390.8 205.7 403.7 179.8 L 376 166 C 362.6 192.9 350.2 219.4 334.1 242.9 L 359.6 260.4 Z M 375.5 167.2 C 362.2 200.6 353.2 227 349.2 245.9 L 379.4 252.4 C 382.9 236.2 391.1 211.7 404.2 178.6 L 375.5 167.2 Z M 348.9 247.3 C 347.2 261.9 347.8 274.6 351.8 284.7 C 356.1 295.7 364.4 303.2 375.2 305.7 L 382.4 275.6 C 382.2 275.6 381.5 275.7 380.6 273.3 C 379.3 270 378.2 263.3 379.7 251.1 L 348.9 247.3 Z M 375.3 305.7 C 386 308.3 397.2 305.5 406.4 301.4 C 415.9 297.2 425.4 290.9 433.9 283.6 C 450.4 269.4 466.2 249 470.7 229.1 L 440.5 222.3 C 438.1 233 427.8 248 413.7 260.1 C 406.9 265.9 400 270.4 393.9 273.1 C 387.5 275.9 383.8 275.9 382.4 275.6 L 375.3 305.7 Z M 470.7 229.1 C 475.8 206.3 495.2 190.4 515.1 187.2 C 524.8 185.6 533.9 187.1 541.3 191.7 C 548.6 196.1 555.5 204.2 559.6 218.3 L 589.3 209.8 C 583.5 189.3 572.3 174.3 557.5 165.3 C 542.8 156.3 526 154 510.1 156.6 C 478.8 161.7 448.6 186.2 440.5 222.3 L 470.7 229.1 Z M 589.3 209.8 C 583.5 189.3 572.3 174.3 557.5 165.2 C 542.8 156.3 525.9 154 510 156.6 C 478.7 161.7 448.5 186.2 440.5 222.3 L 470.7 229 C 475.8 206.3 495.1 190.4 515 187.1 C 524.7 185.6 533.9 187.1 541.3 191.6 C 548.6 196.1 555.6 204.2 559.6 218.3 L 589.3 209.8 Z M 440.3 223.3 C 435.9 252.3 444.7 275.7 462.3 290.3 L 482 266.5 C 474 259.8 467.9 247.9 470.9 228 L 440.3 223.3 Z M 462.4 290.4 C 471.4 297.7 482.1 302.6 493.6 304.6 L 498.9 274.1 C 492.7 273 486.8 270.4 481.9 266.4 L 462.4 290.4 Z M 493.6 304.6 C 511.3 307.7 529.6 304.9 545.6 296.5 L 531.2 269.1 C 521.3 274.3 509.9 276.1 498.9 274.1 L 493.6 304.6 Z M 545.6 296.5 C 546.6 296 547.5 295.4 548.5 294.9 L 533.1 268.1 C 532.4 268.4 531.8 268.8 531.2 269.1 L 545.6 296.5 Z M 548.6 294.8 C 558.8 288.8 567.5 280.6 574 270.7 L 548.1 253.7 C 544.2 259.6 539 264.5 532.9 268.1 L 548.6 294.8 Z M 574 270.7 C 580.5 260.8 584.6 249.6 586.1 237.8 L 555.4 234 C 554.5 241 552 247.8 548.1 253.7 L 574 270.7 Z M 586.1 237.9 C 588.8 216.9 595.4 193.5 600 176.6 L 570.2 168.4 C 565.7 184.6 558.4 210.3 555.4 234 L 586.1 237.9 Z M 570.2 168.4 C 566.6 181.3 561.3 199.9 557.8 218.6 C 554.3 236.8 552 257.6 556.3 274.4 L 586.3 266.8 C 583.8 257.1 584.8 242.1 588.2 224.4 C 591.4 207.2 596.3 190 600 176.6 L 570.2 168.4 Z M 556.2 274.3 C 558.7 284.3 565 293 573.7 298.5 L 590.2 272.3 C 588.2 271 586.8 269.1 586.3 266.9 L 556.2 274.3 Z M 573.7 298.5 C 582.5 304 593 305.8 603.2 303.7 L 596.7 273.4 C 594.5 273.9 592.1 273.5 590.2 272.3 L 573.7 298.5 Z M 603.2 303.7 C 615.7 301 627.1 293.7 636.5 285.5 C 645.9 277.2 654.3 267.1 660.6 257 L 634.5 240.5 C 629.6 248.3 623.1 256.1 616 262.2 C 608.9 268.6 602.1 272.3 596.7 273.4 L 603.2 303.7 Z" />
        </FitBox>
      </Canvas>
      <Title>Interpolate</Title>
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <FitBox src={c1} dst={rect(0, 0, SIZE, SIZE)}>
          <Path path={path} style="stroke" strokeWidth={4} />
        </FitBox>
      </Canvas>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: example1Height,
  },
  cardContainer: {
    padding: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});
