import { StyleSheet } from 'react-native';
import theme from 'theme';

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // LOADING
  loadingView: {
    backgroundColor: theme.colors.blackLogo,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: this.animHeight,
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 2,
    borderColor: theme.colors.primaryDark,
  },
  // BANNER
  borderRadiusView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 2,
    borderColor: theme.colors.primaryDark,
    overflow: 'hidden',
    backgroundColor: theme.colors.primary,
  },
  titleStyle: {
    fontSize: theme.textSizes.small,
    color: theme.colors.primaryLight,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.rubikRegular,
  },
  bannerStyle: {
    width: theme.size.screenWidth,
    height: theme.size.bannerHeight,
  },
  slideDownImg: {
    height: 20,
    width: 34,
  },
  subContainerView: {
    height: 50,
    alignItems: 'center',
    marginHorizontal: theme.size.screenWidth * 0.15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  // SUB BANNER
  globalCountDownContainer: {
    paddingTop: 5,
  },
  // MAP HOME
  absoluteBlack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.black,
  },
  subBannerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: theme.size.bannerHeight * 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: theme.colors.primaryDark,
    // borderColor: theme.colors.primary,
    // borderWidth: 2,
  },
  // Modal
  topModal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.size.screenWidth,
    height: theme.size.screenHeight / 2 + theme.size.hideElasticSize,
    backgroundColor: theme.colors.primaryDark,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    top: -theme.size.hideElasticSize,
  },
  sliderNotif: {
    backgroundColor: theme.colors.primary,
    width: theme.size.screenWidth / 6,
    marginTop: 50 + theme.size.hideElasticSize,
    marginBottom: 30,
  },
  sliderText: {
    textAlign: 'center',
    padding: 10,
    fontFamily: theme.fontFamily.rubikRegular,
  },
});

export default styles;
