import {
    incidentHistories,
    IncidentHistory,
    isOperational,
    Service,
    services as serviceStatus,
    statusLabel as status,
    StatusType
} from "data";
import {NextResponse} from "next/server";

type ResponseData = {
    isOperational: boolean,
    status: StatusType,
    incidentHistories: IncidentHistory[],
    serviceStatus: Service[],
}

export async function GET(): Promise<NextResponse<ResponseData>> {
    return NextResponse.json({
        isOperational,
        status,
        incidentHistories,
        serviceStatus
    })
}