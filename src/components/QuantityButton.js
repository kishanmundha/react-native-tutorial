import React, { Component } from 'react';

import {
  View,
  TouchableNativeFeedback,
  Text,
} from 'react-native';

export class QuantityButton extends Component {
  static propTypes = {
    value: React.PropTypes.number,
    onChangeValue: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  updateQty(qty) {
    let value = this.props.value;
    if (!value) {
      value = 0;
    }

    value += qty;

    if (this.props.onChangeValue) {
      this.props.onChangeValue(value);
    }
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {!!this.props.value && <View style={{ flexDirection: 'row' }}>
          <View>
            <TouchableNativeFeedback onPress={() => this.updateQty(-1)}>
              <View style={{ borderColor: '#009688', borderWidth: 1, borderStyle: 'solid', backgroundColor: '#009688', width: 20, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>-</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={{ borderColor: '#009688', borderWidth: 1, borderStyle: 'solid', width: 30 }}>
            <Text style={{ textAlign: 'center' }}>{this.props.value}</Text>
          </View>
        </View>}
        {!this.props.value && <View style={{ borderColor: '#009688', borderWidth: 1, borderStyle: 'solid', width: 50, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }}>
          <TouchableNativeFeedback onPress={() => this.updateQty(1)}>
            <View style={{ paddingLeft: 2, paddingRight: 2 }}>
              <Text style={{ textAlign: 'center' }}>Add</Text>
            </View>
          </TouchableNativeFeedback>
        </View>}
        <View>
          <TouchableNativeFeedback onPress={() => this.updateQty(1)}>
            <View style={{ borderColor: '#009688', borderWidth: 1, borderStyle: 'solid', backgroundColor: '#009688', width: 20, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 2, borderBottomRightRadius: 2 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>+</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}
