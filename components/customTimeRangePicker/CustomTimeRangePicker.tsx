import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const CustomTimeRangePicker: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const showTimePicker = (type: 'start' | 'end') => {
    if (type === 'start') {
      setShowStartTimePicker(true);
    } else {
      setShowEndTimePicker(true);
    }
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined, type: 'start' | 'end') => {
    if (selectedTime !== undefined) {
      if (type === 'start') {
        setStartTime(selectedTime);
      } else {
        setEndTime(selectedTime);
      }
    }

    if (Platform.OS === 'android') {
      // On Android, DateTimePicker closes automatically
      setShowStartTimePicker(false);
      setShowEndTimePicker(false);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => showTimePicker('start')}>
        <View>
          <Text>Start Time: {startTime ? startTime.toLocaleTimeString() : 'Select Start Time'}</Text>
          <Ionicons name="md-time" size={24} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showTimePicker('end')}>
        <View>
          <Text>End Time: {endTime ? endTime.toLocaleTimeString() : 'Select End Time'}</Text>
          <Ionicons name="md-time" size={24} color="black" />
        </View>
      </TouchableOpacity>

      {showStartTimePicker && (
        <DateTimePicker
          value={startTime || new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={(event, selectedTime) => handleTimeChange(event, selectedTime, 'start')}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          value={endTime || new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={(event, selectedTime) => handleTimeChange(event, selectedTime, 'end')}
        />
      )}
    </View>
  );
};

export default CustomTimeRangePicker;
