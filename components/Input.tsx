import {StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React, { ComponentProps, ReactNode, useState } from 'react'
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';


// ** Third Party
import {  Controller, useFormContext } from 'react-hook-form';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 



interface ExtraInputProps {
    label?: React.ReactNode;
    error?: string;
    password?: boolean;
    iconName?: string;
    passwordIcon?: React.ReactNode;
    suffixIcon?: boolean;
    onFocus?: () => void;
    name: string;
    placeholder: string;  
    rules?: object; // Add the rules prop
}

type InputProps = TextInputProps & ExtraInputProps

const Input: React.FC<InputProps> = ({
  label,
  iconName,
  error,
  password,
  passwordIcon,
  placeholder,
  suffixIcon,
  onFocus = () => {},
  name,
  rules,
  ...rest
}) => {
  const { control, formState, setValue, trigger } = useFormContext();
  const { errors } = formState;
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [hidePassword, setHidePassword] = React.useState<boolean | undefined>(password);

  const hasError = errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <View style={{ marginBottom: 20 }}>
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: error
                  ? Colors.red
                  : isFocused
                  ? Colors.darkBlue
                  : '#80747B',
              },
            ]}
          >
            <Text style={[styles.label]}>{label}</Text>
            <TextInput
              secureTextEntry={hidePassword}
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={field.onChange}
              onBlur={() => {
                field.onBlur();
                trigger(name);
              }}
              onFocus={() => {
                onFocus();
                setIsFocused(true);
              }}
              placeholder={placeholder}
              style={{ color: Colors.primary, flex: 1 }}
              value={field.value}
              // editable={false}
            />
            {suffixIcon && (
              <MaterialCommunityIcons
                name="plus-circle"
                color="#808080"
                size={22}
              />
            )}
            {passwordIcon && (
              <MaterialCommunityIcons
                onPress={() => setHidePassword(!hidePassword)}
                style={{ fontSize: FontSize.large, color: '#B2B2B2' }}
                name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              />
            )}
          </View>
          {errors[name] && (
            <Text style={{ color: 'red', fontSize: 12, marginTop: 7 }}>
              {String(errors[name]?.message)}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default Input

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    top: -8,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    fontSize: 12,
    color: "#4E444B"
  },
  inputContainer: {
    height: 56,
    backgroundColor: Colors.background,
    flexDirection: "row",
    paddingHorizontal: 8,
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 4
  }
})

{/* <TextInput 
          secureTextEntry = {hidePassword}
    
          autoCorrect = {false}
          onFocus = {() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          placeholder={placeholder}
          style={{color: Colors.primary, flex: 1}}
          {...rest}
        /> */}