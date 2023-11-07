import React from 'react';
import { Toast, ToastDescription, ToastTitle, VStack } from "@gluestack-ui/themed";

function Toaster({id, message, type }: any) {
  return (
    <Toast nativeID={id} action={type} variant="accent">
      <VStack space="xs">
        <ToastTitle>New Message</ToastTitle>
        <ToastDescription>
          {message}
        </ToastDescription>
      </VStack>
    </Toast>
  );
}

export default Toaster;
