package com.lds.trackdayb.mvo;

import java.util.ArrayList;
import java.util.List;

import com.lds.trackdayb.dto.ReferenceFavoriteDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReferenceFavoriteMVO extends ReferenceFavoriteDTO {
    List<String> relativeTimeInfoList = new ArrayList<>();
}
