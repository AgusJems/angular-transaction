export interface KaryawanInterface {
    id?: string;
    name?: string;
    dob?: string;
    status?: string;
    address?: string;
    karyawanDetail?: DetailKaryawanInterface
}

export interface DetailKaryawanInterface {
    nik?: string;
    npwp?: string;
}


