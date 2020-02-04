import React, { Component } from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'

import BackButton from '../BackButton'
import { Props } from '../reducer'
import TitleBar from '../TitleBar'
import ListView from './ListView'

class MultiDeleteHistoryScreen extends Component<Props> {
  render() {
    const { history, setState } = this.props
    const numSelected = history.reduce((memo, sit) => memo + Number(!!sit.selected), 0)

    return (
      <>
        <TitleBar name="MULTI DELETE" style={{ marginHorizontal: 17 }} />

        <Text
          style={{
            color: '#fff9',
            marginTop: 14,
            textAlign: 'center',
          }}
        >
          Select multiple sits to delete at once.
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (!numSelected) {
              return
            }
            Alert.alert(
              `Are you sure you want to delete ${numSelected === 1 ? 'this' : 'these'} ${numSelected} item${
                numSelected === 1 ? '' : 's'
              }?`,
              "This can't be undone.",
              [
                { text: 'Cancel' },
                {
                  onPress: () => {
                    setState({ history: [...history].filter(sit => !sit.selected) })
                  },
                  style: 'destructive',
                  text: 'Delete',
                },
              ],
            )
          }}
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#fffa',
            borderRadius: 7,
            height: 29,
            justifyContent: 'center',
            marginBottom: 28,
            marginTop: 28,
            width: 170,
          }}
        >
          <Text style={{ color: numSelected ? '#730e0e' : '#0007', fontSize: 14, fontWeight: '600' }}>
            Delete {numSelected} item{numSelected === 1 ? '' : 's'}
          </Text>
        </TouchableOpacity>

        <ListView
          {...this.props}
          onPress={(index: number) => {
            const newHistory = [...history]
            newHistory[index].selected = !newHistory[index].selected
            setState({ history: newHistory })
          }}
        />

        <BackButton
          color="#fffa"
          onPress={() => {
            setState({
              history: [
                ...history.map(sit => {
                  const newSit = { ...sit }
                  delete newSit.selected
                  return newSit
                }),
              ],
              screen: 'HistoryScreen',
            })
          }}
          saveSpace
          text="Done"
        />
      </>
    )
  }
}

export default MultiDeleteHistoryScreen