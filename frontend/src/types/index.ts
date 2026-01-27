export interface Song {
    _id: string;
    song_name: string;
    artist: string;
    intro_audio_url: string;
    lyrics_link: string;
    language: 'Hindi' | 'Bengali' | 'English';
    short_code: string;
    is_selected: boolean;
    album?: string;
    added_by?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface LockStatus {
    locked: boolean;
}
