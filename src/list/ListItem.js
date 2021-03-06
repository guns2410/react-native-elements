import React, { PropTypes } from 'react'
import { View, StyleSheet, TouchableHighlight, Image, Platform } from 'react-native'
import Icon from '../icons/Icon'
import Text from '../text/Text'
import colors from '../config/colors'
import fonts from '../config/fonts'
import normalize from '../helpers/normalizeText'

let styles

const ListItem = ({
  onPress,
  title,
  leftIcon,
  rightIcon,
  avatar,
  avatarStyle,
  underlayColor,
  subtitle,
  subtitleStyle,
  containerStyle,
  wrapperStyle,
  titleStyle,
  hideChevron,
  chevronColor,
  roundAvatar,
  component,
  fontFamily,
  titleProps,
  subtitleProps,
}) => {
  let Component = onPress ? TouchableHighlight : View
  if (component) {
    Component = component
  }
  if (typeof avatar === 'string') {
    avatar = {uri: avatar}
  }
  return (
    <Component
      onPress={onPress}
      underlayColor={underlayColor}
      style={[styles.container, containerStyle && containerStyle]}>
      <View style={[styles.wrapper, wrapperStyle && wrapperStyle]}>
        {
          leftIcon && leftIcon.name && (
            <Icon
              type={leftIcon.type}
              iconStyle={[styles.icon, leftIcon.style && leftIcon.style]}
              name={leftIcon.name}
              color={leftIcon.color || colors.grey4}
            />
          )
        }
        {
          avatar && (
            <Image
              style={[
                styles.avatar,
                roundAvatar && {borderRadius: 17},
                avatarStyle && avatarStyle]}
              source={avatar}
              />
          )
        }
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              titleStyle && titleStyle,
              !leftIcon && {marginLeft: 10},
              fontFamily && {fontFamily}
            ]} {...titleProps}>{title}</Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                !leftIcon && {marginLeft: 10},
                subtitleStyle && subtitleStyle,
                fontFamily && {fontFamily}
              ]} {...subtitleProps}>{subtitle}</Text>
          )}
        </View>
        {
          onPress && !hideChevron && (
            <View style={styles.chevronContainer}>
              <Icon
                type={rightIcon.type}
                style={styles.chevron}
                size={28}
                name={rightIcon.name}
                color={rightIcon.color || chevronColor} />
            </View>
          )
        }
      </View>
    </Component>
  )
}

ListItem.defaultProps = {
  underlayColor: 'white',
  chevronColor: colors.grey4,
  rightIcon: {name: 'chevron-right'},
  hideChevron: false,
  roundAvatar: false,
  titleProps: {},
  subtitleProps: {},
}

ListItem.propTypes = {
  title: PropTypes.string,
  avatar: PropTypes.any,
  icon: PropTypes.any,
  onPress: PropTypes.func,
  rightIcon: PropTypes.object,
  underlayColor: PropTypes.string,
  subtitle: PropTypes.string,
  subtitleStyle: PropTypes.any,
  containerStyle: PropTypes.any,
  wrapperStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  hideChevron: PropTypes.bool,
  chevronColor: PropTypes.string,
  roundAvatar: PropTypes.bool,
  titleProps: PropTypes.object,
  subtitleProps: PropTypes.object,
}

styles = StyleSheet.create({
  avatar: {
    width: 34,
    height: 34
  },
  container: {
    padding: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    flexDirection: 'row'
  },
  icon: {
    marginRight: 8
  },
  title: {
    fontSize: normalize(14),
    color: colors.grey1
  },
  subtitle: {
    color: colors.grey3,
    fontSize: normalize(12),
    marginTop: 1,
    ...Platform.select({
      ios: {
        fontWeight: '600'
      },
      android: {
        fontFamily: fonts.android.bold
      }
    })
  },
  titleContainer: {
    justifyContent: 'center'
  },
  chevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  chevron: {
  }
})

export default ListItem
