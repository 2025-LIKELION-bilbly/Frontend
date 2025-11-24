let demoMeetingCode: string | null = null;

export const setDemoMeetingCode = (code: string) => {
    demoMeetingCode = code;
    console.log("랜덤 생성된 code: ", demoMeetingCode) // 확인용 console
};

export const getDemoMeetingCode = () => demoMeetingCode;
