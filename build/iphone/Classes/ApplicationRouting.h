/**
 * Appcelerator Titanium Mobile
 * This is generated code. Do not modify. Your changes will be lost.
 * Generated code is Copyright (c) 2009 by Appcelerator, Inc.
 * All Rights Reserved.
 */
#import <Foundation/Foundation.h>

@protocol TitaniumAppAssetResolver
- (NSData*) resolveAppAsset:(NSURL*)url;
- (oneway void)release;
- (id)retain;
@end

@interface ApplicationRouting : NSObject<TitaniumAppAssetResolver> {
}
- (NSData*) resolveAppAsset:(NSURL*)url;
- (NSData*) pageNamedAbout;
- (NSData*) pageNamedAct;
- (NSData*) pageNamedPic;
- (NSData*) styleNamedCss_index;
- (NSData*) scriptNamedJs_act;
- (NSData*) scriptNamedJs_jquery_1_3_2;
- (NSData*) scriptNamedJs_pic_old;
- (NSData*) scriptNamedJs_pic;
- (NSData*) scriptNamedJs_utl;

@end
