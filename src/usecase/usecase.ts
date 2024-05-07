export interface UseCase <InputDto, OutputDto> {
    execute(inputDto: InputDto): Promise<OutputDto>
}
