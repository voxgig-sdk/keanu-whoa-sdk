export interface Whoa {
    "1080p"?: string;
    "360p"?: string;
    "480p"?: string;
    "720p"?: string;
    audio?: string;
    character?: string;
    current_whoa_in_movie?: number;
    director?: string;
    full_line?: string;
    id?: number;
    movie?: string;
    movie_duration?: string;
    poster?: string;
    timestamp?: string;
    total_whoas_in_movie?: number;
    video?: Record<string, any>;
    whoa_in_movie?: string;
    year?: number;
}
export interface WhoaLoadMatch {
    id: number;
    $action?: string;
    [action: string]: any;
}
export interface WhoaListMatch {
    "1080p"?: string;
    "360p"?: string;
    "480p"?: string;
    "720p"?: string;
    audio?: string;
    character?: string;
    current_whoa_in_movie?: number;
    director?: string;
    full_line?: string;
    id?: number;
    movie?: string;
    movie_duration?: string;
    poster?: string;
    timestamp?: string;
    total_whoas_in_movie?: number;
    video?: Record<string, any>;
    whoa_in_movie?: string;
    year?: number;
}
