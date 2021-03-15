# Problem

I'm trying to make a little audio visualiser, basically an oscilloscope.

I'm trying to plot a line based on an array of numbers ranging between 0 and 2

`[0.1, 1.1, 0.8, 1.8, 0.5, 0.3, 1, 1.99]`

I know the `height` and `width` of the thing I'm plotting to. So `x` becomes `width / length of array * position in array`

I have a working line where `y` is `(Value from array * height) / 2`. This gives a line that is centered and expresses the difference in the values across the full range of available space.

## goal 1

I want to be able to position the neutral position of the line `value from array = 1` at a height of my choosing. I then want to be able to limit the ratio of height that is used to express the values, so I can fit multiple lines on the same graph all stacked up.

### Pretty mush sorted

```
var v = dataArray[i] / 128.0; // value between 0 ~ 2;
var variance = 10;
var startPos = 100;
var y = v * variance + startPos - variance;
```

## goal 2

I'd like to express it as always rising from base position never dipping below the base line.

I tried using a rule where if the value dropped below 1 I replaced it with a 1 but I got loads of 1.

I think the issue arises because the "resting state" is 1.

Essentially I'd like to make a live version of this.
