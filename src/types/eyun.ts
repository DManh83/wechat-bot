// Eyun API Types

export interface EyunConfig {
    baseUrl: string
    token: string
}

export interface EyunResponse<T = any> {
    code: string
    message: string
    data?: T
}

export interface LoginResponse {
    wId: string
    wcId: string | null
    wAccount: string | null
    nickName: string | null
    headUrl: string | null
    sex: number | null
    mobilePhone: string | null
    deviceType: number | null
    uin: number | null
}

// Common request parameters
export interface BaseRequest {
    wId: string
    wcId?: string
    aid?: string
}

// ===== Message Types =====
/** Send text message */
export interface SendTextRequest extends BaseRequest {
    /** Message text content */
    content: string
    /** Comma-separated WeChat IDs to @, or "notify@all" for everyone */
    at?: string
}

/** Send image message (URL) */
export interface SendImageRequest extends BaseRequest {
    /** Public image URL */
    content: string
}

/** Send file message */
export interface SendFileRequest extends BaseRequest {
    /** Public file URL */
    path: string
    /** File name with extension */
    fileName: string
}

export interface SendFileBase64Request extends BaseRequest {
    base64: string
    fileName: string
}

export interface SendVoiceRequest extends BaseRequest {
    content: string
    length: number
}

export interface SendVideoRequest extends BaseRequest {
    path: string
    thumbPath: string
}

export interface SendLinkRequest extends BaseRequest {
    title: string
    url: string
    description: string
    thumbUrl: string
}

export interface SendNameCardRequest extends BaseRequest {
    nameCardId: string
}

export interface SendEmojiRequest extends BaseRequest {
    imageMd5: string
    imgSize: string
}

export interface SendAppletRequest extends BaseRequest {
    imgUrl: string
    content: string
}

export interface RevokeMsgRequest extends BaseRequest {
    msgId: number
    newMsgId: number
    createTime: number
}

// ===== Forward Types =====
export interface ForwardFileRequest extends BaseRequest {
    content: string
}

export interface ForwardImageRequest extends BaseRequest {
    content: string
}

export interface ForwardVideoRequest extends BaseRequest {
    content: string
}

export interface ForwardUrlRequest extends BaseRequest {
    content: string
}

export interface ForwardAppletRequest extends BaseRequest {
    content: string
}

// ===== Download Types =====
export interface GetMsgFileRequest {
    msgId: number
    wId: string
    content: string
}

export interface GetMsgImgRequest {
    wId: string
    msgId: number
    content: string
    type?: number
}

export interface GetMsgVoiceRequest {
    wId: string
    msgId: number
    length: number
    bufId: string
    fromUser: string
}

export interface GetMsgEmojiRequest {
    wId: string
    msgId: number
    content: string
}

export interface AsyncVideoDownloadRequest {
    wId: string
    msgId: number
    content: string
}

export interface AsyncVideoDownloadResponse {
    taskId: string
}

// ===== Contact Types =====
export interface InitFriendListRequest {
    wId: string
}

export interface GetAddressListRequest {
    wId: string
}

export interface GetContactRequest {
    wId: string
    wcId: string
}

export interface GetContactPlusRequest {
    wId: string
    wcId: string
}

export interface SearchUserRequest {
    wId: string
    wcId: string
}

export interface AddUserRequest {
    wId: string
    v1: string
    v2: string
    type: number
    verify: string
}

export interface AcceptUserRequest {
    wId: string
    v1: string
    v2: string
    type: number
}

export interface DelContactRequest {
    wId: string
    wcId: string
}

export interface ModifyRemarkRequest {
    /** Login instance identifier */
    wId: string
    /** Friend's WeChat ID */
    wcId: string
    /** New remark name */
    remark: string
}

export interface SetFriendPermissionRequest {
    wId: string
    wcId: string
    type: number
}

export interface SetTopContactRequest {
    /** Login instance identifier */
    wId: string
    /** Friend ID or group ID */
    wcId: string
    /** 1=Pin, 0=Unpin */
    operType: number
}

export interface SetDisturbRequest {
    /** Login instance identifier */
    wId: string
    /** Friend ID or group ID */
    chatRoomId: string
    /** 0=enable DND, 1=disable DND */
    type: number
}

export interface SendHeadImageRequest {
    /** Login instance identifier */
    wId: string
    /** Public avatar image URL */
    path: string
}

export interface CheckZombieRequest {
    /** Login instance identifier */
    wId: string
    /** Friend's WeChat ID(s), comma-separated, max 20 */
    wcId: string
}

export interface GetQrCodeRequest {
    /** Login instance identifier */
    wId: string
}

export interface UserPrivacySettingsRequest {
    /** Login instance identifier */
    wId: string
    /** Privacy setting type: 4=friend verification, 7=recommend contacts, 8=phone, 25=WeChat ID, 38=group, 39=QR code, 40=name card */
    privacyType: number
    /** 1=off, 2=on */
    switchType: number
}

// ===== Group Types =====
export interface CreateChatroomRequest {
    /** Login instance identifier */
    wId: string
    /** Group member IDs, comma-separated, min 2 */
    userList: string
    /** Group name (optional) */
    topic?: string
}

export interface CreateChatroomResponse {
    /** Group ID */
    chatRoomID: string
    /** Group QR code image in Base64 format */
    base64: string
    /** Creation status */
    status: number
}

export interface AddChatRoomMemberRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Group member WeChat IDs, comma-separated */
    userList: string
}

export interface InviteChatRoomMemberRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Group member WeChat IDs, comma-separated */
    userList: string
}

export interface DeleteChatRoomMemberRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Group member WeChat IDs, comma-separated */
    userList: string
}

export interface ModifyGroupNameRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** New group name */
    content: string
}

export interface ScanJoinRoomRequest {
    /** Login instance identifier */
    wId: string
    /** Group QR code URL */
    url: string
    /** 0=join group, 1=return name & count, 10=return raw HTML */
    type?: number
}

export interface ModifyGroupRemarkRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Group remark name */
    content: string
}

export interface QueryGroupMemberDetailRequest {
    wId: string
    groupId: string
    maxIndex?: number
}

export interface GetChatRoomMemberRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
}

export interface GetChatRoomMemberInfoRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Member WeChat ID */
    userList: string
}

export interface ChatRoomMemberInfo {
    /** WeChat ID */
    userName: string
    /** Nickname */
    nickName: string
    /** Remark/alias */
    remark: string
    /** Personal signature */
    signature: string
    /** Gender */
    sex: number
    /** WeChat number */
    aliasName: string
    /** Country */
    country: string | null
    /** Large avatar URL */
    bigHead: string
    /** Small avatar URL */
    smallHead: string
    /** Tag list */
    labelList: string | null
    /** Friend credential v1 */
    v1: string
    /** Friend credential v2 */
    v2: string
}

export interface GetChatRoomInfoRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
}

export interface GetGroupQrCodeRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
}

export interface QuitChatRoomRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
}

export interface SetChatRoomAnnouncementRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Group announcement content */
    content: string
}

export interface RoomTodoRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Group announcement message ID (from callback after setting announcement) */
    newMsgId: number
    /** Operation type: 0 = Set todo, 1 = Withdraw todo */
    operType: number
    /** Required for withdrawal; returned after successful setting */
    sign?: number
}

export interface RoomAppTodoRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Mini-program message ID (from message callback) */
    newMsgId: number
    /** Mini-program title (from message callback) */
    title: string
    /** Mini-program redirect address (from message callback) */
    pagePath: string
    /** Mini-program ID (from message callback) */
    userName: string
    /** Original mini-program sender ID (from message callback) */
    sendWcId: string
    /** Required for revocation; returned after successful setting */
    sign?: number
}

export interface OperateChatRoomRequest {
    /** Login instance identifier */
    wId: string
    /** Group ID */
    chatRoomId: string
    /** Group member WeChat ID(s), multiple separated by commas */
    wcId: string
    /** Operation type: 1 = add admin(s), 2 = remove admin(s), 3 = transfer owner */
    type: number
}

// ===== Tag Types =====
export interface AddContactLabelRequest {
    wId: string
    name: string
}

export interface ModifyContactLabelRequest {
    wId: string
    labelId: number
    name: string
}

export interface DeleteContactLabelRequest {
    wId: string
    labelId: number
}

// ===== Moments Types =====
export interface SnsSendRequest {
    wId: string
    content: string
    atUsers?: string[]
}

export interface SnsSendImageRequest {
    wId: string
    images: string[]
    content?: string
}

export interface AsyncSnsSendVideoRequest {
    wId: string
    videoUrl: string
    title?: string
    content?: string
}

export interface SnsSendUrlRequest {
    wId: string
    url: string
    title: string
    desc: string
    imageUrl?: string
}

export interface SnsPraiseRequest {
    wId: string
    snsId: string
}

export interface SnsCommentRequest {
    wId: string
    snsId: string
    content: string
    replyId?: string
}

export interface SnsCommentDelRequest {
    wId: string
    snsId: string
    commentId: string
}

export interface GetCircleRequest {
    wId: string
    snsId?: string
    maxId?: string
    count?: number
}

export interface GetFriendCircleRequest {
    wId: string
    wcId: string
    maxId?: string
    count?: number
}

export interface GetSnsObjectRequest {
    wId: string
    snsId: string
}

// ===== Channels Types =====
export interface SearchFinderRequest {
    keyword: string
}

export interface FinderUserHomeRequest {
    finderId: string
}

export interface FinderFollowRequest {
    finderId: string
}

export interface FinderPublishRequest {
    wId: string
    content: string
    location?: string
}

// ===== Favorites Types =====
export interface GetFavoriteListRequest {
    wId: string
    count?: number
    offset?: number
}

export interface GetFavoriteContentRequest {
    wId: string
    favoriteId: string
}

export interface DeleteFavoriteContentRequest {
    wId: string
    favoriteId: string
}

// ===== Instance Management Types =====
export interface BatchOfflineRequest {
    wIds: string[]
}

export interface QueryOnlineListRequest {
    wIds?: string[]
}

export interface ReconnectRequest {
    wId: string
}

export interface QueryOnlineStatusRequest {
    wId: string
}

export interface SetProxyRequest {
    wId: string
    proxyIp: string
    proxyPort: number
}

export interface CDNDownFileRequest {
    url: string
    wId: string
}

export interface UploadCDNImageRequest {
    wId: string
    url: string
}

export interface SendCDNVideoRequest {
    wId: string
    url: string
    title?: string
    desc?: string
}

export interface GetReqTimesRequest {
    wId: string
}

export interface GetUserFlowRequest {
    wId: string
}

// ===== Contact Response Types =====
export interface ContactInfo {
    wcId: string
    nickName: string
    avatar: string
    country: string
    province: string
    city: string
    gender: number
    signature?: string
    alias?: string
    type?: number
}

export interface GroupInfo {
    groupId: string
    groupName: string
    avatar: string
    memberCount: number
    ownerId: string
    announcement?: string
}

export interface GroupMemberInfo {
    wcId: string
    nickName: string
    avatar: string
    joinTime?: number
    role?: number
}

// ===== Moments Response Types =====
export interface SnsObject {
    snsId: string
    content: string
    media?: string[]
    likeCount?: number
    commentCount?: number
    createTime?: number
}

