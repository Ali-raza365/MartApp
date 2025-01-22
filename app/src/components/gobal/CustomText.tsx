import React from "react";
import { Text, TextProps, TextStyle, StyleSheet } from "react-native";
import { Colors, Fonts } from "@utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";


interface Props extends TextProps {
  variant?: 
     "h1"|
     "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h8"
    | "h9"
    | "body";
  fontFamily?: Fonts;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
}

const CustomText: React.FC<Props> = ({
  variant = "body",
  fontFamily = Fonts.Regular, // Replace "DefaultFont" with a default font from your `Fonts`
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...rest
}) => {
  // Define default font sizes for each variant
  const defaultFontSizes: Record<string, number> = {
    h1: RFValue(fontSize || 24),
    h2: RFValue(fontSize || 22),
    h3: RFValue(fontSize || 20),
    h4: RFValue(fontSize || 18),
    h5: RFValue(fontSize || 16),
    h6: RFValue(fontSize || 14),
    h7: RFValue(fontSize || 12),
    h8: RFValue(fontSize || 10),
    h9: RFValue(fontSize || 9),
    body: RFValue(fontSize || 12),
  };

  // Calculate the final font size
  const calculatedFontSize = fontSize || defaultFontSizes[variant];

  return (
    <Text
      style={[
        {
          color:Colors.text,
          fontFamily,
          fontSize: calculatedFontSize,
        },
        Array.isArray(style) ? StyleSheet.flatten(style) : style,
      ]}
      numberOfLines={numberOfLines}
      onLayout={onLayout}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default CustomText;
