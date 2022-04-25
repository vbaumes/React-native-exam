import React from "react";
import { TouchableOpacity } from "react-native";

export type Props = {
    icon: any,
    style: any,
    onPressFunction: any
};

export const MyButton: React.FC<Props> = ({icon, style, onPressFunction}) => {
    return (
      <TouchableOpacity
        style={style}
        onPress={() => {onPressFunction()}}>
        {icon}
      </TouchableOpacity>
    );
}