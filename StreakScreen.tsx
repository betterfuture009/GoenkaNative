import React from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import dayjs from 'dayjs'

type SitProps = {
  date: Date
  duration: number
}

type StreakScreenProps = {
  history: SitProps[]
  pressStop: () => void
}

const StreakScreen = ({ pressStop, history }: StreakScreenProps) => (
  <>
    <FlatList
      data={history}
      keyExtractor={i => i.date.toString()}
      ListHeaderComponent={() => (
        <Text
          style={{
            color: bodyTextColor,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 10,
            // opacity: 0.8,
          }}
        >
          Recent sits:
        </Text>
      )}
      renderItem={({ item: i }) => (
        <View style={{ marginVertical: 8 }}>
          <Text
            style={{
              color: bodyTextColor,
              fontSize: 16,
              opacity: 0.8,
            }}
          >
            {dayjs(i.date).format('ddd MMM D · h[:]mma')} <Text style={{ opacity: 0.5 }}>for</Text>{' '}
            {i.duration} min
          </Text>
        </View>
      )}
    />
    <View style={{ marginBottom: 52 }}>
      <Button onPress={pressStop} title="Back" />
    </View>
  </>
)

// Shared vars
const bodyTextColor = '#f1f1f1'

export default StreakScreen
